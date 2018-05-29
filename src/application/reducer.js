import { combineReducers } from 'redux';
import libraryPath from '../library/reducers/library-path';
import currentView from '../navigation/reducers/current-view';

const reducer = combineReducers({
  libraryPath,
  currentView,
});

export default reducer;
