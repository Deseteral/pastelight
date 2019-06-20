import Path from '../model/path';
import { LibraryPathAction, LibraryPathActionType } from '../actions/library-path-actions';

function libraryPath(state: Path = null, action: LibraryPathAction) : Path {
  switch (action.type) {
    case LibraryPathActionType.LIBRARY_PATH_LOADED:
      return action.payload;
    default:
      return state;
  }
}

export default libraryPath;
