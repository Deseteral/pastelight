import path from 'path';
import { AppContextPaths } from '../application';

function toRelativePath(fullPath: string, paths: AppContextPaths) : string {
  return fullPath.substring(paths.libraryPath.length);
}

function toFullPath(relativePath: string, paths: AppContextPaths) : string {
  return path.join(paths.libraryPath, relativePath);
}

export { toRelativePath, toFullPath };
