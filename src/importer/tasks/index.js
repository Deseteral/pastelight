import ImportActionTypes from '../domain/import-action-types';
import {
  importStart,
  importPreflightComplete,
  importProgress,
  importFinished,
} from '../actions/import';
import { importDirectory } from '../services/importer-service';
import { subscribe } from '../../middleware';

subscribe(ImportActionTypes.IMPORT_START_REQUEST, async (action, dispatch) => {
  dispatch(importStart());

  await importDirectory(
    action.payload.directoryPath,
    totalFileCount => dispatch(importPreflightComplete(totalFileCount)),
    (processedFileCount, progressPercent) => dispatch(importProgress(processedFileCount, progressPercent)),
  );

  dispatch(importFinished());
});
