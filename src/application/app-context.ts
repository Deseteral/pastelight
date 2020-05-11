import path from 'path';
import { promises as fsp } from 'fs';
import { PastelogueClient } from '../pastelogue';
import { Library, LibraryService } from '../library';
import * as Logger from '../logger';

interface AppContext {
  paths: AppContextPaths,
  pastelogue: PastelogueClient,
  library: Library,
  libraryService: LibraryService,
}

interface AppContextPaths {
  libraryPath: string,
  libraryWorkingDirectoryPath: string,
  thumbnails: string,
}

async function createAppContext(libraryPath: string) : Promise<AppContext> {
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
  const library = new Library(libraryWorkingDirectoryPath);
  const libraryService = new LibraryService(library, paths);

  // Create and spawn pastelogue client
  const pastelogue = new PastelogueClient();

  // Create app context
  const appContext: AppContext = {
    paths,
    pastelogue,
    library,
    libraryService,
  };

  // Load library database
  await appContext.library.load();

  // Kick off initial processing
  appContext.pastelogue.processingProgress().subscribe(async (progressInfo) => {
    const filePath = progressInfo.file.output.path;
    await appContext.libraryService.addMediaItemFromPath(filePath);
  });
  appContext.pastelogue.startProcessing(libraryPath);

  return appContext;
}

export { AppContext, AppContextPaths, createAppContext };
