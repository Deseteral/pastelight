import path from 'path';
import { app, ipcRenderer } from 'electron';
import isDevMode from './is-dev-mode';

async function getNativeBinaryPath(pathInsideNative: string[]) : Promise<string> {
  const binaryPath = path.join(...pathInsideNative);
  const isRendererProcess = (process?.type === 'renderer');
  const appPath = isRendererProcess
    ? await ipcRenderer.invoke('app-get-app-path')
    : app.getAppPath();

  const binariesPath = isDevMode()
    ? path.join(process.cwd(), 'binary_deps', binaryPath)
    : path.join(path.dirname(appPath), '..', 'Resources', 'binary_deps', binaryPath);

  return path.resolve(binariesPath);
}

export default getNativeBinaryPath;
