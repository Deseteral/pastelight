import path from 'path';
import { promises as fsp } from 'fs';
import sharp from 'sharp';
import { ThumbnailInfo } from '../library';

async function generateThumbnail(
  filePath: string,
  libraryPath: string,
  libraryWorkingDirectoryPath: string,
) : Promise<ThumbnailInfo> {
  const relativeFilePath = filePath.substring(libraryPath.length);
  const thumbnailPath = path.join(libraryWorkingDirectoryPath, 'thumbnails', relativeFilePath);

  await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

  await sharp(filePath)
    .resize({ width: 235 })
    .toFile(thumbnailPath);

  return {
    path: thumbnailPath,
  };
}

export { generateThumbnail };
