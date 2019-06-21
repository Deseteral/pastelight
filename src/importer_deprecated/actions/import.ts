import ImportAction, {
  ImportStartRequestPayload,
  ImportActionType,
  ImportStartedPayload,
  ImportPreflightCompletedPayload,
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

function importStarted() : ImportAction<ImportStartedPayload> {
  return {
    type: ImportActionType.IMPORT_STARTED,
    payload: null,
  };
}

function importPreflightCompleted(
  totalFileCount: number,
) : ImportAction<ImportPreflightCompletedPayload> {
  return {
    type: ImportActionType.IMPORT_PREFLIGHT_COMPLETED,
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
  importStarted,
  importPreflightCompleted,
  importProgress,
  importFinished,
};
