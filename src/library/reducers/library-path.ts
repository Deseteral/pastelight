import LibraryPath from '../domain/library-path';
import LibraryPathAction, { LibraryPathActionType } from '../domain/library-path-action';

function libraryPath(state: LibraryPath = null, action: LibraryPathAction) : LibraryPath {
  switch (action.type) {
    case LibraryPathActionType.LIBRARY_PATH_LOADED: {
      const newPath: LibraryPath = action.payload as LibraryPath;
      return newPath;
    }
    default:
      return state;
  }
}

export default libraryPath;
