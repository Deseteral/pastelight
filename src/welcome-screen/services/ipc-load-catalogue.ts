import { ipcRenderer } from 'electron';

const IPC_LOAD_CATALOGUE_CHANNEL = 'welcome-screen/load-catalogue';
interface IpcLoadCatalogueData {
  path: string;
}

function ipcSendLoadCatalogue(path: string) {
  const args: IpcLoadCatalogueData = { path };
  ipcRenderer.send(IPC_LOAD_CATALOGUE_CHANNEL, args);
}

export { ipcSendLoadCatalogue, IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData };
