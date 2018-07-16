import ScanningActionTypes from '../domain/scanning-action-types';

const DEFAULT_STATE = {
  isScanning: false,
  totalFiles: null,
  scannedFiles: null,
  progressPercent: null,
};

function libraryPath(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ScanningActionTypes.SCANNING_START:
      return { ...state, isScanning: true };

    case ScanningActionTypes.SCANNING_PREFLIGHT_COMPLETE:
      return { ...state, totalFiles: action.payload.totalFileCount };

    case ScanningActionTypes.SCANNING_PROGRESS:
      return {
        ...state,
        scannedFiles: action.payload.processedFileCount,
        progressPercent: action.payload.progressPercent,
      };

    case ScanningActionTypes.SCANNING_FINISH:
      return { ...DEFAULT_STATE };

    default:
      return state;
  }
}

export default libraryPath;
