import path from 'path';
import { promises as fsp } from 'fs';
import { PastelogueClient } from '../pastelogue';
import { Library, LibraryService } from '../library';
import * as Logger from '../logger';

interface AppContext {
  libraryPath: string,
  libraryWorkingDirectoryPath: string,
  pastelogue: PastelogueClient,
  library: Library,
  libraryService: LibraryService,
}

async function createAppContext(libraryPath: string) : Promise<AppContext> {
  Logger.info('Creating application context');

  // Create working dir for library files
  const libraryWorkingDirectoryPath = path.join(libraryPath, '.pastelight');
  fsp.mkdir(libraryWorkingDirectoryPath, { recursive: true });

  // Create library and library-service
  const library = new Library(libraryWorkingDirectoryPath);
  const libraryService = new LibraryService(library);

  // Create app context
  const appContext: AppContext = {
    libraryPath,
    libraryWorkingDirectoryPath,
    pastelogue: new PastelogueClient(),
    library,
    libraryService,
  };

  // Load library database
  await appContext.library.load();

  // Kick off initial processing
  appContext.pastelogue.processingProgress().subscribe(async (progressInfo) => {
    const filePath = progressInfo.file.output.path;
    appContext.libraryService.addMediaItemFromPath(filePath);
  });
  appContext.pastelogue.startProcessing(libraryPath);

  return appContext;
}

export { AppContext, createAppContext };
