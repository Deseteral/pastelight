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

async function processFile(filePath, fileImportedCallback) {
  const item = await buildPhotoItem(filePath);
  await addToDatabase(item);
  fileImportedCallback();
}

async function importDirectory(
  directoryPath,
  preflightCompletedCallback,
  fileImportedCallback,
) {
  const files = await getAcceptableFiles(directoryPath);

  const totalFileCount = files.length;
  preflightCompletedCallback(totalFileCount);

  Promise.all(files.map(filePath => processFile(filePath, fileImportedCallback)));
}

export default { importDirectory };
