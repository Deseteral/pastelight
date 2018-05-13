import View from '../domain/view';
import ViewAction, { ViewActionType } from '../domain/view-action';

function viewChange(nextView: View) : ViewAction {
  return {
    type: ViewActionType.VIEW_CHANGE,
    payload: nextView,
  };
}

export {
  viewChange,
};
