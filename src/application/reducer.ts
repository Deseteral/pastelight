import { combineReducers, Reducer } from 'redux';
import { libraryPath, LibraryPathState } from '../library';
import { currentView, CurrentViewState } from '../navigation';

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
