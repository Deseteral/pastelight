import { ipcRenderer } from 'electron';
import isDevMode from './is-dev-mode';

async function getAppVersion() {
  return isDevMode()
    ? require('../../package.json').version // eslint-disable-line global-require
    : ipcRenderer.invoke('app-get-version');
}

export default getAppVersion;
