import { combineReducers, Reducer } from 'redux';
import libraryPath, { LibraryPathState } from '../library/reducers/library-path';
import currentView, { CurrentViewState } from '../navigation/reducers/current-view';

interface AppState {
  libraryPath: LibraryPathState;
  currentView: CurrentViewState;
}

const reducer: Reducer<AppState> = combineReducers({
  libraryPath,
  currentView,
});

export default reducer;
export {
  AppState,
};
