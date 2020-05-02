import { PastelogueClient } from '../pastelogue';
import { Library, MediaItem } from '../library';

interface AppContext {
  pastelogue: PastelogueClient;
  library: Library;
}

let appContext: (AppContext|null) = null;

async function initializeAppContext(libraryPath: string) {
  // Load library database
  const library = new Library(libraryPath);
  await library.load();

  // Create app context
  appContext = {
    pastelogue: new PastelogueClient(),
    library,
  };

  // Kick off initial processing
  appContext.pastelogue.on('PROCESSING_PROGRESS', async (progressInfo) => {
    const item: MediaItem = { path: progressInfo.path };
    await appContext?.library.addNewItem(item);
  });
  appContext.pastelogue.startProcessing(libraryPath);
}

function getAppContext() {
  return appContext;
}

export { AppContext, getAppContext, initializeAppContext };
