import { combineReducers, Reducer } from 'redux';
import libraryPath, { LibraryPath } from '../library/reducers/library-path';

interface AppState {
  libraryPath: LibraryPath;
}

const reducer: Reducer<AppState> = combineReducers({
  libraryPath,
});

export default reducer;
export {
  AppState,
};
