import path from 'path';
import { app, remote } from 'electron';
// @ts-ignore
import { rootPath } from 'electron-root-path'; // TODO: Do something with missing declarations
import isDevMode from './is-dev-mode';

function getNativeBinaryPath(pathInsideNative: string[]) : string {
  const binaryPath = path.join(...pathInsideNative);
  const isRendererProcess = (process?.type === 'renderer');
  const getAppPath = isRendererProcess ? remote.app.getAppPath : app.getAppPath;

  const binariesPath = !isDevMode()
    ? path.join(path.dirname(getAppPath()), '..', 'Resources', 'binary_deps', binaryPath)
    : path.join(rootPath, 'binary_deps', binaryPath);

  return path.resolve(binariesPath);
}

export default getNativeBinaryPath;
