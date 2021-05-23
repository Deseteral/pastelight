import path from 'path';
import { app, ipcRenderer, ipcMain, BrowserWindow } from 'electron';

const APP_GET_VERSION_CHANNEL = 'APP_GET_VERSION_CHANNEL';
const APP_GET_APP_PATH_CHANNEL = 'APP_GET_APP_PATH_CHANNEL';
const APP_GET_PATH_CHANNEL = 'APP_GET_PATH_CHANNEL';
const SHOW_CURRENT_WINDOW_CHANNEL = 'SHOW_CURRENT_WINDOW_CHANNEL';
const HIDE_CURRENT_WINDOW_CHANNEL = 'HIDE_CURRENT_WINDOW_CHANNEL';

type Platform = 'windows' | 'mac' | 'linux' | 'unsupported';

abstract class AppService {
  static async getAppVersion(): Promise<string> {
    return AppService.isDevMode()
      ? require('../../package.json').version // eslint-disable-line global-require
      : ipcRenderer.invoke(APP_GET_VERSION_CHANNEL);
  }

  static isDevMode(): boolean {
    return !!process.execPath.match(/[\\/]electron/);
  }

  static getPlatform(): Platform {
    switch (process.platform) {
      case 'win32': return 'windows';
      case 'darwin': return 'mac';
      case 'linux': return 'linux';
      default: return 'unsupported';
    }
  }

  static async getNativeBinaryPath(pathInsideNative: string[]): Promise<string> {
    const binaryPath = path.join(...pathInsideNative);
    const isRendererProcess = (process?.type === 'renderer');
    const appPath = isRendererProcess
      ? await AppService.getAppPath()
      : app.getAppPath();

    const binariesPath = AppService.isDevMode()
      ? path.join(process.cwd(), 'binary_deps', binaryPath)
      : path.join(path.dirname(appPath), '..', 'Resources', 'binary_deps', binaryPath);

    return path.resolve(binariesPath);
  }

  static getPath(name: string): Promise<string> {
    return ipcRenderer.invoke(APP_GET_PATH_CHANNEL, name);
  }

  static getAppPath(): Promise<string> {
    return ipcRenderer.invoke(APP_GET_APP_PATH_CHANNEL);
  }

  static async showCurrentWindow(): Promise<void> {
    await ipcRenderer.invoke(SHOW_CURRENT_WINDOW_CHANNEL);
  }

  static async hideCurrentWindow(): Promise<void> {
    await ipcRenderer.invoke(HIDE_CURRENT_WINDOW_CHANNEL);
  }

  static registerIpcInMainProcess(): void {
    ipcMain.handle(APP_GET_VERSION_CHANNEL, () => app.getVersion());
    ipcMain.handle(APP_GET_APP_PATH_CHANNEL, () => app.getAppPath());
    ipcMain.handle(APP_GET_PATH_CHANNEL, (_, name) => app.getPath(name));
    ipcMain.handle(SHOW_CURRENT_WINDOW_CHANNEL, (event) => BrowserWindow.fromWebContents(event.sender).show());
    ipcMain.handle(HIDE_CURRENT_WINDOW_CHANNEL, (event) => BrowserWindow.fromWebContents(event.sender).hide());
  }
}

export default AppService;
export {
  Platform,
};
