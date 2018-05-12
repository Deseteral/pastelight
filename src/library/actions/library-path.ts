import LibraryPath from '../domain/library-path';
import LibraryPathAction, { LibraryPathActionType } from '../domain/library-path-action';

function libraryPathLoadRequest() : LibraryPathAction {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOAD_REQUEST,
  };
}

function libraryPathLoaded(newPath: LibraryPath) {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOADED,
    payload: newPath,
  };
}

export {
  libraryPathLoadRequest,
  libraryPathLoaded,
};
