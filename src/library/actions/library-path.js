import LibraryPathActionTypes from '../domain/library-path-action-types';

function libraryPathLoadRequest() {
  return {
    type: LibraryPathActionTypes.LIBRARY_PATH_LOAD_REQUEST,
    payload: null,
  };
}

function libraryPathLoaded(newPath) {
  return {
    type: LibraryPathActionTypes.LIBRARY_PATH_LOADED,
    payload: newPath,
  };
}

export {
  libraryPathLoadRequest,
  libraryPathLoaded,
};
