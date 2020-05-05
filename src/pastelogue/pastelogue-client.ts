import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { getNativeBinaryPath } from '../application';

// Request
interface StartProcessingRequest {
  action: 'START_PROCESSING';
  args: {
    path: string;
  };
}

type Request = (StartProcessingRequest);

// Response
interface ProcessingStartedResponse {
  id: 'PROCESSING_STARTED';
  payload: null;
}
const isProcessingStartedResponse = (res: Response) : res is ProcessingStartedResponse => (res.id === 'PROCESSING_STARTED');

interface ProgressPayload {
  progress: {
    current: number,
    total: number,
  },
  file: {
    input: {
      path: string,
    },
    output: {
      path: string,
    },
  },
}
interface ProcessingProgressResponse {
  id: 'PROCESSING_PROGRESS';
  payload: ProgressPayload;
}
const isProcessingProgressResponse = (res: Response) : res is ProcessingProgressResponse => (res.id === 'PROCESSING_PROGRESS');

interface ProcessingFinishedResponse {
  id: 'PROCESSING_FINISHED';
  payload: null;
}
const isProcessingFinishedResponse = (res: Response) : res is ProcessingFinishedResponse => (res.id === 'PROCESSING_FINISHED');

type Response = (
  ProcessingStartedResponse |
  ProcessingProgressResponse |
  ProcessingFinishedResponse
);

const EXEC_PATH = getNativeBinaryPath(['pastelogue', 'pastelogue_server']);
class PastelogueClient {
  private serverProcess: ChildProcessWithoutNullStreams;
  private eventEmitter: EventEmitter;
  private observable: Observable<Response>;

  constructor() {
    this.eventEmitter = new EventEmitter();

    this.serverProcess = spawn(EXEC_PATH);
    this.serverProcess.stdout.on('data', (data: Buffer) => {
      const events: Response[] = data.toString('utf8')
        .split('\n')
        .filter((s) => (s.length > 0))
        .map((s) => s.trim())
        .map((json) => JSON.parse(json));

      events.forEach((event) => this.eventEmitter.emit('response', event));
    });

    this.observable = new Observable((subscriber) => {
      this.eventEmitter.on('response', (response) => subscriber.next(response));
    });
  }

  startProcessing(cataloguePath: string) {
    const request: StartProcessingRequest = {
      action: 'START_PROCESSING',
      args: { path: cataloguePath },
    };

    this.sendProcessRequest(request);

    console.log('Started processing');
  }

  responses() : Observable<Response> {
    return this.observable;
  }

  processingProgress() : Observable<ProgressPayload> {
    return this.observable
      .pipe(
        filter(isProcessingProgressResponse),
        map((response) => response.payload),
      );
  }

  private sendProcessRequest(req: Request) {
    this.serverProcess.stdin.write(JSON.stringify(req));
    this.serverProcess.stdin.end();
  }
}

export { PastelogueClient };
export { Response, ProcessingProgressResponse };
export { isProcessingStartedResponse, isProcessingProgressResponse, isProcessingFinishedResponse };
