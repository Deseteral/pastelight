import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';
import {
  StartProcessingRequest,
  PastelogueRequest,
  PastelogueResponse,
  isReadyResponse,
} from './model';
import Logger from '../application/logger';

class PastelogueClient {
  private serverProcess: ChildProcessWithoutNullStreams;
  private eventEmitter: EventEmitter;

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

    this.eventEmitter.on('response', (response) => {
      if (isReadyResponse(response)) {
        Logger.info(`Connected to pastelogue_server v${response.payload.version}`);
      }
    });
  }

  startProcessing(cataloguePath: string): void {
    const request: StartProcessingRequest = {
      action: 'START_PROCESSING',
      args: { path: cataloguePath },
    };

    this.sendProcessRequest(request);

    Logger.info('Started processing');
  }

  onResponse(callback: (response: PastelogueResponse) => void): void {
    this.eventEmitter.on('response', callback);
  }

  private sendProcessRequest(req: PastelogueRequest): void {
    this.serverProcess.stdin.write(JSON.stringify(req));
    this.serverProcess.stdin.end();
  }
}

export default PastelogueClient;
