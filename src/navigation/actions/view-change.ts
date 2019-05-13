import ViewChangeAction, { ViewChangeActionType } from '../domain/view-change-action';
import View from '../domain/view';

function viewChange(nextView: View) : ViewChangeAction {
  return {
    type: ViewChangeActionType.VIEW_CHANGE,
    payload: nextView,
  };
}

export { viewChange };
