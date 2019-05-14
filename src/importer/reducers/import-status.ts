
import ImportAction, { ImportPayload, ImportPreflightCompletePayload, ImportProgressPayload, ImportActionType } from '../domain/import-action';
import ImportStatus from '../domain/import-status';

const DEFAULT_STATE: ImportStatus = {
  isInProgress: false,
  totalFileCount: null,
  importedFilesCount: null,
  progressPercent: null,
};

function importStatus(state: ImportStatus = DEFAULT_STATE, action: ImportAction<ImportPayload>) {
  switch (action.type) {
    case ImportActionType.IMPORT_START:
      return { ...state, isInProgress: true };

    case ImportActionType.IMPORT_PREFLIGHT_COMPLETE: {
      const payload = action.payload as ImportPreflightCompletePayload;
      return { ...state, totalFileCount: payload.totalFileCount };
    }

    case ImportActionType.IMPORT_PROGRESS: {
      const payload = action.payload as ImportProgressPayload;
      return {
        ...state,
        importedFilesCount: payload.processedFileCount,
        progressPercent: payload.progressPercent,
      };
    }

    case ImportActionType.IMPORT_FINISHED:
      return { ...DEFAULT_STATE };

    default:
      return state;
  }
}

export default importStatus;
