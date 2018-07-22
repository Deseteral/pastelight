const subscriptions = {};

const middleware = ({ dispatch, getState }) => next => (action) => {
  if (!subscriptions[action.type]) return next(action);
  subscriptions[action.type].forEach(callback => callback(action, dispatch, getState));
  return getState();
};

function subscribe(action, callback) {
  if (!subscriptions[action]) subscriptions[action] = [];
  subscriptions[action].push(callback);
}

export default middleware;
export { subscribe };
