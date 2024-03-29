import { OpenDialogOptions } from 'electron';
import { promises as fsp } from 'fs';
import { AppService } from '../../application/app-service';
import * as RecentLocationListService from './recent-location-list';
import { ipcSendLoadCatalogue } from './ipc-load-catalogue';
import { DialogService } from '../../application/dialog-service';

interface ValidationResult {
  valid: boolean;
  message?: string;
}

async function isValidPath(potentialPath: string): Promise<ValidationResult> {
  try {
    const stats = await fsp.stat(potentialPath);
    return stats.isDirectory()
      ? { valid: true }
      : { valid: false, message: 'Selected path is not a directory' };
  } catch (err) {
    return { valid: false, message: 'Directory does not exist' };
  }
}

async function openCataloguePicker(): Promise<string | null> {
  const options: OpenDialogOptions = {
    title: 'Pick photo catalogue',
    properties: ['openDirectory', 'createDirectory'],
  };

  AppService.hideCurrentWindow();
  const result = await DialogService.showOpenDialog(options);
  AppService.showCurrentWindow();

  return result.canceled ? null : result.filePaths[0];
}

async function loadFromPath(cataloguePath: string): Promise<void> {
  const validationResult = await isValidPath(cataloguePath);

  if (!validationResult.valid) {
    DialogService.showErrorBox('Cannot open photo catalogue', validationResult.message as string);
    return;
  }

  ipcSendLoadCatalogue(cataloguePath);
  RecentLocationListService.addNewLocationFromPath(cataloguePath);
}

async function loadFromPicker(): Promise<void> {
  const pickerPath = await openCataloguePicker();
  if (pickerPath) {
    await loadFromPath(pickerPath);
  }
}

export { loadFromPath, loadFromPicker };
