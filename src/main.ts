import { app, ipcMain } from 'electron';
import { createAppWindow } from './windows/app-window/app-window';
import { createWelcomeScreenWindow } from './windows/welcome-screen-window/welcome-screen-window';
import { IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData } from './welcome-screen/services/ipc-load-catalogue';
import { DialogService } from './application/dialog-service';
import { AppService } from './application/app-service';

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

AppService.registerIpcInMainProcess();
DialogService.registerIpcInMainProcess();
