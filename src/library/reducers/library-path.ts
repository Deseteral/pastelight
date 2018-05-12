import LibraryPath from '../domain/library-path';
import LibraryPathAction, { LibraryPathActionType } from '../domain/library-path-action';

function libraryPath(state: LibraryPath = null, action: LibraryPathAction) : LibraryPath {
  switch (action.type) {
    case LibraryPathActionType.LIBRARY_PATH_LOADED:
      return action.payload;
    default:
      return state;
  }
}

export default libraryPath;
