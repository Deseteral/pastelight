function libraryPathLoadRequest() {
  return {
    type: 'LIBRARY_PATH_LOAD_REQUEST',
    payload: null,
  };
}

function libraryPathLoaded(newPath) {
  return {
    type: 'LIBRARY_PATH_LOADED',
    payload: newPath,
  };
}

export {
  libraryPathLoadRequest,
  libraryPathLoaded,
};
