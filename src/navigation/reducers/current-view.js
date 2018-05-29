import Views from '../domain/views';

function currentView(state = Views.LIBRARY, action) {
  switch (action.type) {
    case 'VIEW_CHANGE':
      return action.payload;
    default:
      return state;
  }
}

export default currentView;
