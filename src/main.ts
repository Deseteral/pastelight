import { app } from 'electron';
import { createMainWindow } from './windows';

const native = require('./native/index.node');

app.on('ready', () => {
  createMainWindow();
  console.log(native.helloWorld());
});
app.on('window-all-closed', () => app.quit());
