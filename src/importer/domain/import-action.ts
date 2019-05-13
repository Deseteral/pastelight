enum ImportActionType {
  IMPORT_START_REQUEST = 'IMPORT_START_REQUEST',
  IMPORT_START = 'IMPORT_START',
  IMPORT_PREFLIGHT_COMPLETE = 'IMPORT_PREFLIGHT_COMPLETE',
  IMPORT_PROGRESS = 'IMPORT_PROGRESS',
  IMPORT_FINISHED = 'IMPORT_FINISHED',
}

interface ImportStartRequestPayload {
  directoryPath: string; // TODO: This might be shared with library module (LibraryPath type)
}

type ImportStartPayload = null;

interface ImportPreflightCompletePayload {
  totalFileCount: number;
}

interface ImportProgressPayload {
  processedFileCount: number;
  progressPercent: number;
}

type ImportFinishedPayload = null;

type ImportPayload = (
  ImportStartRequestPayload |
  ImportStartPayload |
  ImportPreflightCompletePayload |
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
  ImportStartPayload,
  ImportPreflightCompletePayload,
  ImportProgressPayload,
  ImportFinishedPayload,
};
