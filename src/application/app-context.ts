import { PastelogueClient } from '../pastelogue';
import { Library, MediaItem } from '../library';

interface AppContext {
  pastelogue: PastelogueClient;
  library: Library;
}

async function createAppContext(libraryPath: string) : Promise<AppContext> {
  // Load library database
  const library = new Library(libraryPath);
  await library.load();

  // Create app context
  const appContext = {
    pastelogue: new PastelogueClient(),
    library,
  };

  // Kick off initial processing
  appContext.pastelogue.on('PROCESSING_PROGRESS', async (progressInfo) => {
    const item: MediaItem = { path: progressInfo.file.output.path };
    await appContext?.library.addNewItem(item);
  });
  appContext.pastelogue.startProcessing(libraryPath);

  return appContext;
}

export { AppContext, createAppContext };
