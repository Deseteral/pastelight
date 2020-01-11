import { app } from 'electron';
import { createAppWindow } from './application';

app.on('ready', async () => {
  await createAppWindow();
});
app.on('window-all-closed', () => app.quit());
