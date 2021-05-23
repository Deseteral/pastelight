import path from 'path';
import { promises as fsp } from 'fs';
// import sharp from 'sharp'; // TODO: sharp requires native dependecy - replace it
import { pathToThumbnailPath } from '../library/path-converter';
import { ThumbnailInfo } from '../library/media-item';
import { AppContextPaths } from '../application/app-context';

async function generateThumbnail(filePath: string, paths: AppContextPaths) : Promise<ThumbnailInfo> {
  const thumbnailPath = pathToThumbnailPath(filePath, paths);

  await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

  // await sharp(filePath)
  //   .resize({ width: 400 })
  //   .toFile(thumbnailPath);

  return {
    relativePath: filePath, // thumbnailPath,
  };
}

export { generateThumbnail };
