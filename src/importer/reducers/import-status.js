import ImportingActionTypes from '../domain/import-action-types';

const DEFAULT_STATE = {
  isInProgress: false,
  totalFileCount: null,
  importedFilesCount: null,
  progressPercent: null,
};

function importStatus(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ImportingActionTypes.IMPORT_START:
      return { ...state, isInProgress: true };

    case ImportingActionTypes.IMPORT_PREFLIGHT_COMPLETE:
      return { ...state, totalFileCount: action.payload.totalFileCount };

    case ImportingActionTypes.IMPORT_PROGRESS:
      return {
        ...state,
        importedFilesCount: action.payload.processedFileCount,
        progressPercent: action.payload.progressPercent,
      };

    case ImportingActionTypes.IMPORT_FINISH:
      return { ...DEFAULT_STATE };

    default:
      return state;
  }
}

export default importStatus;
