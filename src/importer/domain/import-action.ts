enum ImportActionType {
  IMPORT_START_REQUEST = 'IMPORT_START_REQUEST',
  IMPORT_STARTED = 'IMPORT_STARTED',
  IMPORT_PREFLIGHT_COMPLETED = 'IMPORT_PREFLIGHT_COMPLETED',
  IMPORT_PROGRESS = 'IMPORT_PROGRESS',
  IMPORT_FINISHED = 'IMPORT_FINISHED',
}

interface ImportStartRequestPayload {
  directoryPath: string; // TODO: This might be shared with library module (LibraryPath type)
}

type ImportStartedPayload = null;

interface ImportPreflightCompletedPayload {
  totalFileCount: number;
}

interface ImportProgressPayload {
  processedFileCount: number;
  progressPercent: number;
}

type ImportFinishedPayload = null;

type ImportPayload = (
  ImportStartRequestPayload |
  ImportStartedPayload |
  ImportPreflightCompletedPayload |
  ImportProgressPayload |
  ImportFinishedPayload
);

interface ImportAction<PT extends ImportPayload> {
  type: ImportActionType;
  payload: PT;
}

export default ImportAction;
export {
  ImportActionType,
  ImportPayload,
  ImportAction,
  ImportStartRequestPayload,
  ImportStartedPayload,
  ImportPreflightCompletedPayload,
  ImportProgressPayload,
  ImportFinishedPayload,
};
