import { remote, OpenDialogOptions } from 'electron';
import fs from 'fs';
import util from 'util';
import * as RecentLocationListService from './recent-location-list';
import { ipcSendLoadCatalogue } from './ipc-load-catalogue';

const stat = util.promisify(fs.stat);

interface ValidationResult {
  valid: boolean;
  message?: string;
}

async function isValidPath(potentialPath: string) : Promise<ValidationResult> {
  try {
    const stats = await stat(potentialPath);
    return stats.isDirectory()
      ? { valid: true }
      : { valid: false, message: 'Selected path is not a directory' };
  } catch (err) {
    return { valid: false, message: 'Directory does not exist' };
  }
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

async function loadFromPath(cataloguePath: string) : Promise<void> {
  const validationResult = await isValidPath(cataloguePath);

  if (!validationResult.valid) {
    remote.dialog.showErrorBox(
      'Cannot open photo catalogue',
      validationResult.message as string,
    );
    return;
  }

  ipcSendLoadCatalogue(cataloguePath);
  RecentLocationListService.addNewLocationFromPath(cataloguePath);
}

async function loadFromPicker() {
  const pickerPath = await openCataloguePicker();
  if (pickerPath) {
    await loadFromPath(pickerPath);
  }
}

export { loadFromPath, loadFromPicker };
