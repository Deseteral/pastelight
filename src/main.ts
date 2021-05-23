import { app, BrowserWindow, dialog, ipcMain } from 'electron';
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
ipcMain.handle('app-get-version', async () => app.getVersion());
ipcMain.handle('show-open-dialog', (_, options) => dialog.showOpenDialog(options));
ipcMain.handle('show-error-box', (_, title, content) => dialog.showErrorBox(title, content));
ipcMain.handle('show-current-window', (event) => BrowserWindow.fromWebContents(event.sender).show());
ipcMain.handle('hide-current-window', (event) => BrowserWindow.fromWebContents(event.sender).hide());
