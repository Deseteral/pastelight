import Views from '../domain/views';
import ViewChangeActionTypes from '../domain/view-change-action-types';

function currentView(state = Views.LIBRARY, action) {
  switch (action.type) {
    case ViewChangeActionTypes.VIEW_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export default currentView;
