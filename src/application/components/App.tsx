import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import { IpcLoadCatalogueData, IPC_LOAD_CATALOGUE_CHANNEL } from '../../welcome-screen';
import { PastelogueClient } from '../../pastelogue';
import { MediaItem, Library } from '../../library';

interface AppContext {
  pastelogue: PastelogueClient,
  library: Library
}

let appContext: AppContext;

function App() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);

  useEffect(() => {
    ipcRenderer.on(IPC_LOAD_CATALOGUE_CHANNEL, async (_, data: IpcLoadCatalogueData) => {
      appContext = {
        pastelogue: new PastelogueClient(),
        library: new Library(data.path),
      };

      await appContext.library.load();
      appContext.pastelogue.startProcessing(data.path);

      appContext.pastelogue.on('PROCESSING_PROGRESS', async (progressInfo) => {
        const item: MediaItem = { path: progressInfo.path };
        await appContext.library.addNewItem(item);
        setPhotos(await appContext.library.getAllItems());
      });
    });
  }, []);

  return (
    <NavigationProvider>
      <NavigationBar />
      <ViewRouter />
      {photos.map((item) => (
        <img src={item.path} style={({ width: '200px' })} key={item.path} />
      ))}
    </NavigationProvider>
  );
}

export default App;
