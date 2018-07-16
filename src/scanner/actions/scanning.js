import ScanningActionTypes from '../domain/scanning-action-types';

function scanningStart() {
  return {
    type: ScanningActionTypes.SCANNING_START,
    payload: null,
  };
}

function scanningPreflightComplete(totalFileCount) {
  return {
    type: ScanningActionTypes.SCANNING_PREFLIGHT_COMPLETE,
    payload: {
      totalFileCount,
    },
  };
}

function scanningProgress(processedFileCount, progressPercent) {
  return {
    type: ScanningActionTypes.SCANNING_FINISH,
    payload: {
      processedFileCount,
      progressPercent,
    },
  };
}

function scanningFinished() {
  return {
    type: ScanningActionTypes.SCANNING_FINISH,
    payload: null,
  };
}

export {
  scanningStart,
  scanningPreflightComplete,
  scanningProgress,
  scanningFinished,
};
