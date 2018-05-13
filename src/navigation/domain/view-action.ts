import View from './view';

enum ViewActionType {
  VIEW_CHANGE = 'VIEW_CHANGE',
}

interface ViewAction {
  type: ViewActionType;
  payload: View
}

export default ViewAction;
export {
  ViewActionType,
};
