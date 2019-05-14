import View from '../domain/view';
import ViewChangeAction, { ViewChangeActionType } from '../domain/view-change-action';

function currentView(state: View = View.LIBRARY, action: ViewChangeAction) {
  switch (action.type) {
    case ViewChangeActionType.VIEW_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export default currentView;
