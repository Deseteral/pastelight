import { BrowserWindow, app, BrowserWindowConstructorOptions } from 'electron';
import { isDevMode, getPlatform } from '../../application';

declare const WELCOME_SCREEN_WINDOW_WEBPACK_ENTRY: any;

let welcomeScreenWindow: (BrowserWindow | null);

function createWelcomeScreenWindow() {
  const framelessOptions: BrowserWindowConstructorOptions = (getPlatform() === 'mac')
    ? { titleBarStyle: 'hidden', vibrancy: 'under-window' }
    : { frame: false, transparent: true };

  welcomeScreenWindow = new BrowserWindow({
    title: 'pastelight',
    width: 800,
    height: 480,
    show: false,
    center: true,
    resizable: false,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    ...framelessOptions,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  welcomeScreenWindow.loadURL(WELCOME_SCREEN_WINDOW_WEBPACK_ENTRY);

  // TODO: Make correct menu for this window

  if (isDevMode()) {
    welcomeScreenWindow.webContents.openDevTools();
  }

  welcomeScreenWindow.on('closed', () => {
    welcomeScreenWindow = null;
    app.quit();
  });

  welcomeScreenWindow.once('ready-to-show', () => {
    (welcomeScreenWindow as BrowserWindow).show();
  });

  return welcomeScreenWindow;
}

export default createWelcomeScreenWindow;
