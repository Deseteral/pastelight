import { combineReducers, Reducer } from 'redux';
import libraryPath from '../library/reducers/library-path';
import currentView from '../navigation/reducers/current-view';
import LibraryPath from '../library/domain/library-path';
import View from '../navigation/domain/view';

interface AppState {
  libraryPath: LibraryPath;
  currentView: View;
}

const reducer: Reducer<AppState> = combineReducers({
  libraryPath,
  currentView,
});

export default reducer;
export {
  AppState,
};
