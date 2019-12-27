import { combineReducers, Reducer } from 'redux';
import { currentView, CurrentViewState } from '../navigation';

interface AppState {
  currentView: CurrentViewState;
}

const reducer: Reducer<AppState> = combineReducers({
  currentView,
});

export default reducer;
export {
  AppState,
};
