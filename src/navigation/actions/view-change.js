import ViewChangeActionTypes from '../domain/view-change-action-types';

function viewChange(nextView) {
  return {
    type: ViewChangeActionTypes.VIEW_CHANGE,
    payload: nextView,
  };
}

export { viewChange };
