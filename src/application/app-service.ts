import path from 'path';
import { app, ipcRenderer } from 'electron';

type Platform = 'windows' | 'mac' | 'linux' | 'unsupported';

abstract class AppService {
  static async getAppVersion(): Promise<string> {
    return AppService.isDevMode()
      ? require('../../package.json').version // eslint-disable-line global-require
      : ipcRenderer.invoke('app-get-version');
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

  static async getNativeBinaryPath(pathInsideNative: string[]) : Promise<string> {
    const binaryPath = path.join(...pathInsideNative);
    const isRendererProcess = (process?.type === 'renderer');
    const appPath = isRendererProcess
      ? await ipcRenderer.invoke('app-get-app-path')
      : app.getAppPath();

    const binariesPath = AppService.isDevMode()
      ? path.join(process.cwd(), 'binary_deps', binaryPath)
      : path.join(path.dirname(appPath), '..', 'Resources', 'binary_deps', binaryPath);

    return path.resolve(binariesPath);
  }
}

export default AppService;
export {
  Platform,
};
