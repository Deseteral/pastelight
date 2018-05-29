function viewChange(nextView) {
  return {
    type: 'VIEW_CHANGE',
    payload: nextView,
  };
}

export { viewChange };
