import { PastelogueClient } from '../pastelogue';
import { Library } from '../library';

interface AppContext {
  pastelogue: PastelogueClient;
  library: Library;
}

let appContext: (AppContext|null) = null;

async function initializeAppContext(libraryPath: string) {
  appContext = {
    pastelogue: new PastelogueClient(),
    library: new Library(libraryPath),
  };

  await appContext.library.load();

  // appContext.pastelogue.startProcessing(data.path);
  // appContext.pastelogue.on('PROCESSING_PROGRESS', async (progressInfo) => {
  //   const item: MediaItem = { path: progressInfo.path };
  //   await appContext.library.addNewItem(item);
  //   setPhotos(await appContext.library.getAllItems());
  // });
}

function getAppContext() {
  return appContext;
}

export { AppContext, getAppContext, initializeAppContext };
