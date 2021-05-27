import View from '../domain/view';

interface NavigationAction {
  type: string;
  nextView: View;
}

function navigationReducer(state: View, action: NavigationAction): View {
  switch (action.type) {
    case 'VIEW_CHANGE': return action.nextView;
    default: return state;
  }
}

function viewChangeAction(nextView: View): NavigationAction {
  return { type: 'VIEW_CHANGE', nextView };
}

export {
  NavigationAction,
  navigationReducer,
  viewChangeAction,
};
