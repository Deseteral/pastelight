import { BrowserWindow, app } from 'electron';
import AppService from '../../application/app-service';

declare const APP_WINDOW_WEBPACK_ENTRY: any;

let appWindow = null;

async function createAppWindow(): Promise<BrowserWindow> {
  appWindow = new BrowserWindow({
    title: 'pastelight',
    width: 1280,
    height: 960,
    show: false,
    center: true,
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  if (AppService.isDevMode()) {
    appWindow.webContents.openDevTools();
  }

  appWindow.on('closed', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

export default createAppWindow;
