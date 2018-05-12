import { app } from 'electron';
import MainWindow from './windows/main-window';

app.on('ready', MainWindow.create);
app.on('window-all-closed', () => app.quit());