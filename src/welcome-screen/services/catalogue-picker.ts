import { remote, ipcRenderer, OpenDialogOptions } from 'electron';
import fs from 'fs';

interface ValidationResult {
  status: boolean;
  message?: string;
}

const IPC_LOAD_CATALOGUE_CHANNEL = 'welcome-screen/load-catalogue';
interface IpcLoadCatalogue {
  path: string;
}

function isValidPath(potentialPath: string) : Promise<ValidationResult> {
  return new Promise((resolve) => {
    fs.stat(potentialPath, (err, stats) => {
      if (err) {
        resolve({ status: false, message: 'Directory does not exist' });
        return;
      }

      if (stats.isDirectory()) {
        resolve({ status: true });
      } else {
        resolve({ status: false, message: 'Selected path is not a directory' });
      }
    });
  });
}

async function openCataloguePicker(): Promise<string | null> {
  const { dialog } = remote;
  const options: OpenDialogOptions = {
    title: 'Pick photo catalogue',
    properties: ['openDirectory', 'createDirectory'],
  };

  remote.getCurrentWindow().hide();
  const result = await dialog.showOpenDialog(options);
  remote.getCurrentWindow().show();

  return result.canceled ? null : result.filePaths[0];
}

async function showErrorBox(content: string) {
  const { dialog } = remote;
  dialog.showErrorBox('Cannot open photo catalogue', content);
}

async function loadFromPath(cataloguePath: string) {
  const validationResult = await isValidPath(cataloguePath);

  if (!validationResult.status) {
    showErrorBox(validationResult.message as string);
    return;
  }

  const args: IpcLoadCatalogue = { path: cataloguePath };
  ipcRenderer.send(IPC_LOAD_CATALOGUE_CHANNEL, args);
}

async function loadFromPicker() {
  const pickerPath = await openCataloguePicker();
  if (pickerPath) {
    await loadFromPath(pickerPath);
  }
}

export { loadFromPath, loadFromPicker, IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogue };
