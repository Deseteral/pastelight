import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { getNativeBinaryPath } from '../application';
import { StartProcessingRequest, ProgressPayload, isProcessingProgressResponse, Request, Response } from './model';

// Client
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
