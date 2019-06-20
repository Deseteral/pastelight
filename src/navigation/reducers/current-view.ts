import View from '../domain/view';
import { ViewChangeAction, ViewChangeActionType } from '../actions/view-change-actions';

type CurrentViewState = View;

function currentView(state: View = View.LIBRARY, action: ViewChangeAction) {
  switch (action.type) {
    case ViewChangeActionType.VIEW_CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export default currentView;
export {
  CurrentViewState,
};
