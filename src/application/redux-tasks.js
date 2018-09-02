import fs from 'fs';
import { join as pathJoin } from 'path';
import createOnActionMiddleware from 'redux-on-action';

const { middleware, onAction } = createOnActionMiddleware();

function listDirectoriesInPath(path) {
  return fs.readdirSync(path)
    .map(name => pathJoin(path, name))
    .filter(statPath => fs.lstatSync(statPath).isDirectory());
}

function requireIfPresent(path) {
  try {
    require(path); // eslint-disable-line global-require, import/no-dynamic-require
  } catch (e) { } // eslint-disable-line no-empty
}

function registerTasksSync() {
  listDirectoriesInPath(pathJoin(__dirname, '..'))
    .map(dirPath => pathJoin(dirPath, 'tasks'))
    .forEach(requireIfPresent);
}

export { middleware, onAction, registerTasksSync };
