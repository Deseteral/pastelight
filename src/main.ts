import { app } from 'electron';
import { createAppWindow, createWelcomeScreenWindow } from './windows';

app.on('ready', async () => {
  await createWelcomeScreenWindow();
  await createAppWindow();
});
app.on('window-all-closed', () => app.quit());
