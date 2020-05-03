import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';
import { getNativeBinaryPath } from '../application';

// Request
interface PastelogueStartProcessingRequest {
  action: 'START_PROCESSING';
  args: {
    path: string;
  };
}

interface PastelogueReadExifDataRequest {
  action: 'READ_EXIF_DATA';
  args: {
    path: string;
  };
}

type PastelogueRequest = (PastelogueStartProcessingRequest | PastelogueReadExifDataRequest);

// Response
interface PastelogueProcessingStartedResponse {
  id: 'PROCESSING_STARTED';
  payload: null;
}

interface PastelogueProgressPayload {
  progress: number;
  total: number;
  path: string;
  originalPath: string;
}
interface PastelogueProcessingProgressResponse {
  id: 'PROCESSING_PROGRESS';
  payload: PastelogueProgressPayload;
}

interface PastelogueProcessingFinishedResponse {
  id: 'PROCESSING_FINISHED';
  payload: null;
}

interface PastelogueExifDataPayload {
  exifData: any;
}
interface PastelogueExifDataResponse {
  id: 'EXIF_DATA';
  payload: PastelogueExifDataPayload;
}

type PastelogueResponse = (
  PastelogueProcessingStartedResponse |
  PastelogueProcessingProgressResponse |
  PastelogueProcessingFinishedResponse |
  PastelogueExifDataResponse
);

const EXEC_PATH = getNativeBinaryPath(['pastelogue', 'pastelogue_server']);
class PastelogueClient {
  private serverProcess: ChildProcessWithoutNullStreams;
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();

    this.serverProcess = spawn(EXEC_PATH);
    this.serverProcess.stdout.on('data', (data: Buffer) => {
      const events: PastelogueResponse[] = data.toString('utf8')
        .split('\n')
        .filter((s) => (s.length > 0))
        .map((s) => s.trim())
        .map((json) => JSON.parse(json));

      events.forEach((event) => this.eventEmitter.emit('event', event));
    });
  }

  startProcessing(cataloguePath: string) {
    const action: PastelogueRequest = {
      action: 'START_PROCESSING',
      args: { path: cataloguePath },
    };

    this.serverProcess.stdin.write(JSON.stringify(action));
    this.serverProcess.stdin.end();

    console.log('Started processing');
  }

  on<T extends PastelogueResponse['id']>(responseId: T, listener: (data: (PastelogueResponse & { id: T })) => void) {
    this.eventEmitter.on(responseId, listener);
  }
}

export { PastelogueClient };
