import { app, ipcMain } from 'electron';
import { createAppWindow, createWelcomeScreenWindow } from './windows';
import { IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData } from './welcome-screen';

app.on('ready', async () => {
  const welcomeScreenWindow = await createWelcomeScreenWindow();
  const appWindow = await createAppWindow();

  ipcMain.on(IPC_LOAD_CATALOGUE_CHANNEL, (_, args: IpcLoadCatalogueData) => {
    appWindow.webContents.send(IPC_LOAD_CATALOGUE_CHANNEL, args);

    welcomeScreenWindow.hide();
    appWindow.show();
  });
});

app.on('window-all-closed', () => app.quit());

ipcMain.handle('app-get-path', async (_, name) => app.getPath(name));
ipcMain.handle('app-get-app-path', async () => app.getAppPath());
