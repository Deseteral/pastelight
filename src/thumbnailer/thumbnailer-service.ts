import path from 'path';
import { promises as fsp } from 'fs';
import jimp from 'jimp';
import { pathToThumbnailPath } from '../library/path-converter';
import { ThumbnailInfo } from '../library/media-item';
import { AppContextPaths } from '../application/app-context';

class ThumbnailerService {
  static async generateThumbnail(filePath: string, paths: AppContextPaths): Promise<ThumbnailInfo> {
    const thumbnailPath = pathToThumbnailPath(filePath, paths);

    await fsp.mkdir(path.dirname(thumbnailPath), { recursive: true });

    // TODO: This works, but jimp is incredibly slow
    const image = await jimp.read(filePath);
    await image.resize(400, jimp.AUTO);
    await image.writeAsync(thumbnailPath);

    return {
      relativePath: thumbnailPath,
    };
  }
}

export default ThumbnailerService;
