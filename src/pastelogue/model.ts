// Request
export interface StartProcessingRequest {
  action: 'START_PROCESSING';
  args: {
    path: string;
  };
}

export type Request = (StartProcessingRequest);

// Response
export interface ProcessingStartedResponse {
  id: 'PROCESSING_STARTED';
  payload: null;
}
export const isProcessingStartedResponse = (res: Response) : res is ProcessingStartedResponse => (res.id === 'PROCESSING_STARTED');

export interface ProgressPayload {
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
export interface ProcessingProgressResponse {
  id: 'PROCESSING_PROGRESS';
  payload: ProgressPayload;
}
export const isProcessingProgressResponse = (res: Response) : res is ProcessingProgressResponse => (res.id === 'PROCESSING_PROGRESS');

export interface ProcessingFinishedResponse {
  id: 'PROCESSING_FINISHED';
  payload: null;
}
export const isProcessingFinishedResponse = (res: Response) : res is ProcessingFinishedResponse => (res.id === 'PROCESSING_FINISHED');

export type Response = (
  ProcessingStartedResponse |
  ProcessingProgressResponse |
  ProcessingFinishedResponse
);
