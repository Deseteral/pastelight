import View from '../domain/view';

enum ViewChangeActionType {
  VIEW_CHANGE = 'VIEW_CHANGE',
}

interface ViewChangeAction {
  type: ViewChangeActionType,
  payload: View,
}

function viewChange(nextView: View) : ViewChangeAction {
  return {
    type: ViewChangeActionType.VIEW_CHANGE,
    payload: nextView,
  };
}

export {
  viewChange,
  ViewChangeActionType,
  ViewChangeAction,
};
