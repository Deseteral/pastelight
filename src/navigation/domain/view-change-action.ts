import View from './view';

enum ViewChangeActionType {
  VIEW_CHANGE = 'VIEW_CHANGE',
}

interface ViewChangeAction {
  type: ViewChangeActionType,
  payload: View,
}

export default ViewChangeAction;
export { ViewChangeActionType };
