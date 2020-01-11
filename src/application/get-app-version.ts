import { remote } from 'electron';
import isDevMode from './is-dev-mode';

function getAppVersion() {
  return isDevMode()
    ? require('../../package.json').version // eslint-disable-line global-require
    : remote.app.getVersion();
}

export default getAppVersion;
