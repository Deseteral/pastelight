import path from 'path';
import { promises as fsp } from 'fs';
import sharp from 'sharp';
import { ThumbnailInfo, pathToThumbnailPath } from '../library';
import { AppContextPaths } from '../application';

async function generateThumbnail(filePath: string, paths: AppContextPaths) : Promise<ThumbnailInfo> {
  const thumbnailPath = pathToThumbnailPath(filePath, paths);

  await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

  await sharp(filePath)
    .resize({ width: 400 })
    .toFile(thumbnailPath);

  return {
    relativePath: thumbnailPath,
  };
}

export { generateThumbnail };
