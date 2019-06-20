import Path from '../model/path';

enum LibraryPathActionType {
  LIBRARY_PATH_LOAD_REQUEST = 'LIBRARY_PATH_LOAD_REQUEST',
  LIBRARY_PATH_LOADED = 'LIBRARY_PATH_LOADED',
}

interface LibraryPathAction {
  type: LibraryPathActionType;
  payload: Path;
}

function libraryPathLoadRequest() : LibraryPathAction {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOAD_REQUEST,
    payload: null,
  };
}

function libraryPathLoaded(newPath: Path) : LibraryPathAction {
  return {
    type: LibraryPathActionType.LIBRARY_PATH_LOADED,
    payload: newPath,
  };
}

export {
  libraryPathLoadRequest,
  libraryPathLoaded,
  LibraryPathActionType,
  LibraryPathAction,
};
