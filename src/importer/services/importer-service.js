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

function importDirectory(
  directoryPath,
  preflightCompletedCallback,
  fileImportedCallback,
) {
  // const files = await getAcceptableFiles(directoryPath);

  // const totalFileCount = files.length;
  // preflightCompletedCallback(totalFileCount);

  // Promise.all(files.map(filePath => processFile(filePath, fileImportedCallback)));

  return new Promise((resolve) => {
    console.log(`Scanning directory ${directoryPath}`);

    setTimeout(() => {
      const totalFileCount = 100;
      preflightCompletedCallback(totalFileCount);

      let count = 0;
      const iv = setInterval(() => {
        count += 1;
        const percent = `${((count / totalFileCount) * 100).toFixed(0)}%`;
        fileImportedCallback(count, percent);

        if (count === totalFileCount) {
          clearInterval(iv);
          resolve();
        }
      }, 100);
    }, 2000);
  });
}

export { importDirectory };
