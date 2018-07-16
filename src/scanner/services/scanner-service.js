import recursiveReaddir from 'recursive-readdir';
import { buildPhotoItem } from './photo-item-builder';

async function getAcceptableFiles(directoryPath) {
  const supportedPhotoFormats = [
    'jpg', 'jpeg', // TODO: Move this somewhere else
  ];

  const ignoredFilesMatch = supportedPhotoFormats.map(extension => `!*.${extension}`);
  return recursiveReaddir(directoryPath, ignoredFilesMatch);
}

async function addToDatabase(libraryItem) {
  console.log(libraryItem);
}

async function processFile(filePath, fileScannedCallback) {
  const item = await buildPhotoItem(filePath);
  await addToDatabase(item);
  fileScannedCallback();
}

async function scanDirectory(
  directoryPath,
  scannerPreflightCompletedCallback,
  fileScannedCallback,
) {
  const files = await getAcceptableFiles(directoryPath);

  const totalFileCount = files.length;
  scannerPreflightCompletedCallback(totalFileCount);

  Promise.all(files.map(filePath => processFile(filePath, fileScannedCallback)));
}

export default { scanDirectory };
