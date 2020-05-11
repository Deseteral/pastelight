import path from 'path';
import { promises as fsp } from 'fs';
import sharp from 'sharp';
import { ThumbnailInfo, toRelativePath } from '../library';
import { AppContextPaths } from '../application';

async function generateThumbnail(filePath: string, paths: AppContextPaths) : Promise<ThumbnailInfo> {
  const relativeFilePath = toRelativePath(filePath, paths);
  const thumbnailPath = path.join(paths.thumbnails, relativeFilePath);

  await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

  await sharp(filePath)
    .resize({ width: 235 })
    .toFile(thumbnailPath);

  return {
    relativePath: thumbnailPath,
  };
}

export { generateThumbnail };
