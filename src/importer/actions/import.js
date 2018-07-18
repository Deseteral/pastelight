import ImportActionTypes from '../domain/import-action-types';

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
    type: ImportActionTypes.IMPORT_FINISH,
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
  importStart,
  importPreflightComplete,
  importProgress,
  importFinished,
};
