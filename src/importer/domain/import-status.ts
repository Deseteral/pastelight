interface ImportStatus {
  isInProgress: boolean;
  totalFileCount: (number | null);
  importedFilesCount: (number | null);
  progressPercent: (number | null);
}

export default ImportStatus;
