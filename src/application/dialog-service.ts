import { ipcRenderer, ipcMain, dialog, OpenDialogOptions } from 'electron';

const SHOW_OPEN_DIALOG_CHANNEL = 'show-open-dialog';
const SHOW_ERROR_BOX_CHANNEL = 'show-error-box';

class DialogService {
  static showOpenDialog(options: OpenDialogOptions): Promise<Electron.OpenDialogReturnValue> {
    return ipcRenderer.invoke(SHOW_OPEN_DIALOG_CHANNEL, options);
  }

  static async showErrorBox(title: string, content: string): Promise<void> {
    await ipcRenderer.invoke(SHOW_ERROR_BOX_CHANNEL, title, content);
  }

  static registerIpcInMainProcess(): void {
    ipcMain.handle(SHOW_OPEN_DIALOG_CHANNEL, (_, options) => dialog.showOpenDialog(options));
    ipcMain.handle(SHOW_ERROR_BOX_CHANNEL, (_, title, content) => dialog.showErrorBox(title, content));
  }
}

export default DialogService;
