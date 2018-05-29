function libraryPath(state = null, action) {
  switch (action.type) {
    case 'LIBRARY_PATH_LOADED':
      return action.payload;
    default:
      return state;
  }
}

export default libraryPath;
