import path from 'path';
import { promises as fsp } from 'fs';
import { PastelogueClient } from '../pastelogue';
import { Library, MediaItem } from '../library';
import * as Logger from '../logger';

interface AppContext {
  libraryPath: string,
  libraryWorkingDirectoryPath: string,
  pastelogue: PastelogueClient,
  library: Library,
}

async function createAppContext(libraryPath: string) : Promise<AppContext> {
  Logger.info('Creating application context');

  // Create working dir for library files
  const libraryWorkingDirectoryPath = path.join(libraryPath, '.pastelight');
  fsp.mkdir(libraryWorkingDirectoryPath, { recursive: true });

  // Create app context
  const appContext: AppContext = {
    libraryPath,
    libraryWorkingDirectoryPath,
    pastelogue: new PastelogueClient(),
    library: new Library(libraryWorkingDirectoryPath),
  };

  // Load library database
  await appContext.library.load();

  // Kick off initial processing
  appContext.pastelogue.processingProgress().subscribe(async (progressInfo) => {
    const item: MediaItem = { path: progressInfo.file.output.path };
    await appContext.library.addNewItem(item);
  });
  appContext.pastelogue.startProcessing(libraryPath);

  return appContext;
}

export { AppContext, createAppContext };
