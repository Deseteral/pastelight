import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventEmitter } from 'events';
import {
  StartProcessingRequest,
  ProgressPayload,
  isProcessingProgressResponse,
  PastelogueRequest,
  PastelogueResponse,
  isReadyResponse,
} from './model';
import * as Logger from '../logger';

class PastelogueClient {
  private serverProcess: ChildProcessWithoutNullStreams;
  private eventEmitter: EventEmitter;
  private observable: Observable<PastelogueResponse>;

  constructor(pastelogueServerPath: string) {
    this.eventEmitter = new EventEmitter();

    Logger.info(`Spawning pastelogue client at "${pastelogueServerPath}"`);
    this.serverProcess = spawn(pastelogueServerPath);
    this.serverProcess.stdout.on('data', (data: Buffer) => {
      const events: PastelogueResponse[] = data.toString('utf8')
        .split('\n')
        .filter((s) => (s.length > 0))
        .map((s) => s.trim())
        .map((json) => JSON.parse(json));

      events.forEach((event) => this.eventEmitter.emit('response', event));
    });

    this.observable = new Observable((subscriber) => {
      this.eventEmitter.on('response', (response) => subscriber.next(response));
    });

    this.eventEmitter.on('response', (response) => {
      if (isReadyResponse(response)) {
        Logger.info(`Connected to pastelogue_server v${response.payload.version}`);
      }
    });
  }

  startProcessing(cataloguePath: string) {
    const request: StartProcessingRequest = {
      action: 'START_PROCESSING',
      args: { path: cataloguePath },
    };

    this.sendProcessRequest(request);

    Logger.info('Started processing');
  }

  responses() : Observable<PastelogueResponse> {
    return this.observable;
  }

  processingProgress() : Observable<ProgressPayload> {
    return this.observable
      .pipe(
        filter(isProcessingProgressResponse),
        map((response) => response.payload),
      );
  }

  private sendProcessRequest(req: PastelogueRequest) {
    this.serverProcess.stdin.write(JSON.stringify(req));
    this.serverProcess.stdin.end();
  }
}

export { PastelogueClient };
