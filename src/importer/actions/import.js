import ImportActionTypes from '../domain/import-action-types';

function importStartRequest(directoryPath) {
  return {
    type: ImportActionTypes.IMPORT_START_REQUEST,
    payload: {
      directoryPath,
    },
  };
}

function importStart() {
  return {
    type: ImportActionTypes.IMPORT_START,
    payload: null,
  };
}

function importPreflightComplete(totalFileCount) {
  return {
    type: ImportActionTypes.IMPORT_PREFLIGHT_COMPLETE,
    payload: {
      totalFileCount,
    },
  };
}

function importProgress(processedFileCount, progressPercent) {
  return {
    type: ImportActionTypes.IMPORT_PROGRESS,
    payload: {
      processedFileCount,
      progressPercent,
    },
  };
}

function importFinished() {
  return {
    type: ImportActionTypes.IMPORT_FINISH,
    payload: null,
  };
}

export {
  importStartRequest,
  importStart,
  importPreflightComplete,
  importProgress,
  importFinished,
};
