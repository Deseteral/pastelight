import { app } from 'electron';
import { createMainWindow } from './windows';

app.on('ready', () => createMainWindow());
app.on('window-all-closed', () => app.quit());
