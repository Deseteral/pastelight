import path from 'path';
import { promises as fsp } from 'fs';
import sharp from 'sharp';
import { ThumbnailInfo } from '../library';
import { AppContextPaths } from '../application';

async function generateThumbnail(filePath: string, paths: AppContextPaths) : Promise<ThumbnailInfo> {
  const relativeFilePath = filePath.substring(paths.libraryPath.length);
  const thumbnailPath = path.join(paths.libraryWorkingDirectoryPath, 'thumbnails', relativeFilePath);

  await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

  await sharp(filePath)
    .resize({ width: 235 })
    .toFile(thumbnailPath);

  return {
    path: thumbnailPath,
  };
}

export { generateThumbnail };
