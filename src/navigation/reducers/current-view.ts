import View from '../domain/view';
import ViewAction, { ViewActionType } from '../domain/view-action';

function currentView(state: View = View.LIBRARY_VIEW, action: ViewAction) : View {
  switch (action.type) {
    case ViewActionType.VIEW_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export default currentView;
