import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { getExecPath } from '../application';

let serverProcess: ChildProcessWithoutNullStreams;

(function initializePastelogueClient() {
  const execPath = getExecPath(['pastelogue', 'pastelogue_server']);
  serverProcess = spawn(execPath);

  serverProcess.stdout.on('data', (data) => {
    console.log(data);
  });
}());

function startProcessing(cataloguePath: string) {
  const action = {
    action: 'START_PROCESSING',
    args: { path: cataloguePath },
  };

  serverProcess.stdin.write(JSON.stringify(action));
  serverProcess.stdin.end();
}

export {
  startProcessing,
};
