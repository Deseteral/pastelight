import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';
import { getNativeBinaryPath } from '../application';

interface PastelogueRequest {
  action: ('START_PROCESSING' | 'READ_EXIF_DATA');
  args: {
    path: string;
  };
}

interface PastelogueProgress {
  progress: number;
  total: number;
  path: string;
  originalPath: string;
}

type PastelogueResponseId = ('PROCESSING_STARTED' | 'PROCESSING_PROGRESS' | 'PROCESSING_FINISHED');

interface PastelogueProcessingProgress {
  id: PastelogueResponseId;
  payload: (PastelogueProgress | null);
}

const EXEC_PATH = getNativeBinaryPath(['pastelogue', 'pastelogue_server']);
class PastelogueClient {
  private serverProcess: ChildProcessWithoutNullStreams;
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();

    this.serverProcess = spawn(EXEC_PATH);
    this.serverProcess.stdout.on('data', (data: Buffer) => {
      const events: PastelogueProcessingProgress[] = data.toString('utf8')
        .split('\n')
        .filter((s) => (s.length > 0))
        .map((s) => s.trim())
        .map((json) => JSON.parse(json));

      events.forEach((event) => this.eventEmitter.emit(event.id, event.payload));
    });
  }

  startProcessing(cataloguePath: string) {
    const action: PastelogueRequest = {
      action: 'START_PROCESSING',
      args: { path: cataloguePath },
    };

    console.log('Started processing');

    this.serverProcess.stdin.write(JSON.stringify(action));
    this.serverProcess.stdin.end();
  }

  on(id: PastelogueResponseId, listener: (data: PastelogueProgress) => void) {
    this.eventEmitter.on(id, listener);
  }
}

export { PastelogueClient };
