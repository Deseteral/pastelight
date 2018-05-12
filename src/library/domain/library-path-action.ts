import LibraryPath from './library-path';

enum LibraryPathActionType {
  LIBRARY_PATH_LOAD_REQUEST = 'LIBRARY_PATH_LOAD_REQUEST',
  LIBRARY_PATH_LOADED = 'LIBRARY_PATH_LOADED',
}

interface LibraryPathAction {
  type: LibraryPathActionType;
  payload?: LibraryPath;
}

export default LibraryPathAction;
export { LibraryPathActionType };
