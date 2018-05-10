import { app } from 'electron';
import MainWindow from './windows/MainWindow';

app.on('ready', MainWindow.create);
app.on('window-all-closed', () => app.quit());
