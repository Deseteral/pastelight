import LibraryPathActionTypes from '../domain/library-path-action-types';

function libraryPath(state = null, action) {
  switch (action.type) {
    case LibraryPathActionTypes.LIBRARY_PATH_LOADED:
      return action.payload;
    default:
      return state;
  }
}

export default libraryPath;
