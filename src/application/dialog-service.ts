import { ipcRenderer, ipcMain, dialog, OpenDialogOptions } from 'electron';

const SHOW_OPEN_DIALOG_CHANNEL = 'show-open-dialog';
const SHOW_ERROR_BOX_CHANNEL = 'show-error-box';

class DialogService {
  static showOpenDialog(options: OpenDialogOptions): Promise<Electron.OpenDialogReturnValue> {
    return ipcRenderer.invoke(SHOW_OPEN_DIALOG_CHANNEL, options);
  }

  static showErrorBox(title: string, content: string) {
    ipcRenderer.invoke(SHOW_ERROR_BOX_CHANNEL, title, content);
  }

  static registerIpcInMainProcess() {
    ipcMain.handle(SHOW_OPEN_DIALOG_CHANNEL, (_, options) => dialog.showOpenDialog(options));
    ipcMain.handle(SHOW_ERROR_BOX_CHANNEL, (_, title, content) => dialog.showErrorBox(title, content));
  }
}

export default DialogService;
