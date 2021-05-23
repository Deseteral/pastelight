import path from 'path';
import { AppContextPaths } from '../application/app-context';

function toRelativePath(fullPath: string, paths: AppContextPaths) : string {
  return fullPath.substring(paths.libraryPath.length);
}

function toFullPath(relativePath: string, paths: AppContextPaths) : string {
  return path.join(paths.libraryPath, relativePath);
}

function relativeToThumbnailPath(relativePath: string, paths: AppContextPaths) : string {
  return path.join(paths.thumbnails, relativePath);
}

function pathToThumbnailPath(fullPath: string, paths: AppContextPaths) : string {
  return relativeToThumbnailPath(toRelativePath(fullPath, paths), paths);
}

export { toRelativePath, toFullPath, relativeToThumbnailPath, pathToThumbnailPath };
