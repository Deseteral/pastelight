import { remote, OpenDialogOptions } from 'electron';

async function openCataloguePicker(): Promise<string | null> {
  const { dialog } = remote;
  const options: OpenDialogOptions = {
    title: 'Pick photo catalogue',
    properties: ['openDirectory', 'createDirectory'],
  };

  const result = await dialog.showOpenDialog(remote.getCurrentWindow(), options);
  return result.canceled ? null : result.filePaths[0];
}

export default openCataloguePicker;
