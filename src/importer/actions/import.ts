import ImportAction, {
  ImportStartRequestPayload,
  ImportActionType,
  ImportStartPayload,
  ImportPreflightCompletePayload,
  ImportProgressPayload,
  ImportFinishedPayload,
} from '../domain/import-action';

function importStartRequest(directoryPath: string) : ImportAction<ImportStartRequestPayload> {
  return {
    type: ImportActionType.IMPORT_START_REQUEST,
    payload: {
      directoryPath,
    },
  };
}

function importStart() : ImportAction<ImportStartPayload> {
  return {
    type: ImportActionType.IMPORT_START,
    payload: null,
  };
}

function importPreflightComplete(
  totalFileCount: number,
) : ImportAction<ImportPreflightCompletePayload> {
  return {
    type: ImportActionType.IMPORT_PREFLIGHT_COMPLETE,
    payload: {
      totalFileCount,
    },
  };
}

function importProgress(
  processedFileCount: number,
  progressPercent: number,
) : ImportAction<ImportProgressPayload> {
  return {
    type: ImportActionType.IMPORT_PROGRESS,
    payload: {
      processedFileCount,
      progressPercent,
    },
  };
}

function importFinished() : ImportAction<ImportFinishedPayload> {
  return {
    type: ImportActionType.IMPORT_FINISHED,
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
