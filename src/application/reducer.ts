import { combineReducers, Reducer } from 'redux';
import libraryPath from '../library/reducers/library-path';
import currentView from '../navigation/reducers/current-view';
import Path from '../library/model/path';
import View from '../navigation/domain/view';

interface AppState {
  libraryPath: Path;
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
