import electron from 'electron';
import { ipcSendLoadCatalogue } from '../ipc-load-catalogue';

describe('IPC load catalogue service', () => {
  it('should send load request to main process', () => {
    // given
    const path = '/some/test/path';

    // when
    ipcSendLoadCatalogue(path);

    // then
    expect(electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(electron.ipcRenderer.send).toHaveBeenCalledWith(
      'welcome-screen/load-catalogue', { path },
    );
  });
});
