import recursiveReaddir from 'recursive-readdir';
import { buildPhotoItem } from './photo-item-builder';
import MediaItem from '../domain/media-item';

async function getAcceptableFiles(directoryPath: string) : Promise<string[]> {
  const supportedPhotoFormats = [
    'jpg', 'jpeg', // TODO: Move this somewhere else
  ];

  const ignoredFilesMatch = supportedPhotoFormats.map(extension => `!*.${extension}`);
  return recursiveReaddir(directoryPath, ignoredFilesMatch);
}

async function addToDatabase(libraryItem: MediaItem) {
  console.log(libraryItem);
}

async function processFile(filePath: string, fileImportedCallback: () => void) {
  const item = await buildPhotoItem(filePath);
  await addToDatabase(item);
  fileImportedCallback();
}

async function importDirectory(
  directoryPath: string,
  preflightCompletedCallback: (totalFileCount: number) => void,
  fileImportedCallback: () => void,
) {
  const files = await getAcceptableFiles(directoryPath);

  const totalFileCount = files.length;
  preflightCompletedCallback(totalFileCount);

  // TODO: Promise#all rejects as soon as first promise rejects.
  // This should have proper error handling.
  Promise.all(files.map((filePath: string) => processFile(filePath, fileImportedCallback)));
}

export default { importDirectory };
