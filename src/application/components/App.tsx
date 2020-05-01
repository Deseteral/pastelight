import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import { IpcLoadCatalogueData, IPC_LOAD_CATALOGUE_CHANNEL } from '../../welcome-screen';
import { PastelogueClient } from '../../pastelogue';
import { MediaItem, Library } from '../../library';

const pastelogue = new PastelogueClient();
let library: Library;

function App() {
  const [photos, setPhotos] = useState<MediaItem[]>([]);

  useEffect(() => {
    ipcRenderer.on(IPC_LOAD_CATALOGUE_CHANNEL, async (_, data: IpcLoadCatalogueData) => {
      library = new Library(data.path);
      await library.load();
      pastelogue.startProcessing(data.path);
    });

    pastelogue.on('PROCESSING_PROGRESS', async (data) => {
      const item: MediaItem = { path: data.path };
      await library.addNewItem(item);
      setPhotos(await library.getAllItems());
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
