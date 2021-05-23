import path from 'path';
import { promises as fsp } from 'fs';
import PastelogueClient from '../pastelogue/pastelogue-client';
import LibraryRepository from '../library/library-repository';
import LibraryService from '../library/library-service';
import Logger from './logger';
import AppService from './app-service';

interface AppContext {
  paths: AppContextPaths,
  pastelogue: PastelogueClient,
  libraryRepository: LibraryRepository,
  libraryService: LibraryService,
}

interface AppContextPaths {
  libraryPath: string,
  libraryWorkingDirectoryPath: string,
  thumbnails: string,
}

async function createAppContext(libraryPath: string): Promise<AppContext> {
  Logger.info('Creating application context');

  // Create AppContextPaths
  const libraryWorkingDirectoryPath = path.join(libraryPath, '.pastelight');
  const paths: AppContextPaths = {
    libraryPath,
    libraryWorkingDirectoryPath,
    thumbnails: path.join(libraryWorkingDirectoryPath, 'thumbnails'),
  };

  // Create working dir for library files
  fsp.mkdir(paths.libraryWorkingDirectoryPath, { recursive: true });
  fsp.mkdir(paths.thumbnails, { recursive: true });

  // Create library and library-service
  const libraryRepository = new LibraryRepository(libraryWorkingDirectoryPath);
  const libraryService = new LibraryService(libraryRepository, paths);

  // Create and spawn pastelogue client
  const pastelogueServerPath = await AppService.getNativeBinaryPath(['pastelogue', 'pastelogue_server']);
  const pastelogue = new PastelogueClient(pastelogueServerPath);

  // Create app context
  const appContext: AppContext = {
    paths,
    pastelogue,
    libraryRepository,
    libraryService,
  };

  // Load library database
  await appContext.libraryRepository.load();

  // Kick off initial processing
  appContext.pastelogue.processingProgress().subscribe(async (progressInfo) => {
    await appContext.libraryService.addMediaItemFromProgressPayload(progressInfo);
  });
  appContext.pastelogue.startProcessing(libraryPath);

  return appContext;
}

export { useAppContext } from './components/AppContextProvider';
export { AppContext, AppContextPaths, createAppContext };
