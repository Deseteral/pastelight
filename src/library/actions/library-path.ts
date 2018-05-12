import LibraryPath from '../domain/library-path';
import LibraryPathAction, { LibraryPathActionType } from '../domain/library-path-action';

function libraryPathLoadRequest() : LibraryPathAction {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOAD_REQUEST,
    payload: null,
  };
}

function libraryPathLoaded(newPath: LibraryPath) : LibraryPathAction {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOADED,
    payload: newPath,
  };
}

export {
  libraryPathLoadRequest,
  libraryPathLoaded,
};
