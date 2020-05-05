import { PastelogueClient } from '../pastelogue';
import { Library, MediaItem } from '../library';

interface AppContext {
  pastelogue: PastelogueClient;
  library: Library;
}

async function createAppContext(libraryPath: string) : Promise<AppContext> {
  // Create app context
  const appContext = {
    pastelogue: new PastelogueClient(),
    library: new Library(libraryPath),
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
