// Request
export interface StartProcessingRequest {
  action: 'START_PROCESSING';
  args: {
    path: string;
  };
}

export type PastelogueRequest = (StartProcessingRequest);

// Response
export interface ProcessingStartedResponse {
  id: 'PROCESSING_STARTED';
  payload: null;
}
export const isProcessingStartedResponse = (res: PastelogueResponse) : res is ProcessingStartedResponse => (res.id === 'PROCESSING_STARTED');

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
export const isProcessingProgressResponse = (res: PastelogueResponse) : res is ProcessingProgressResponse => (res.id === 'PROCESSING_PROGRESS');

export interface ProcessingFinishedResponse {
  id: 'PROCESSING_FINISHED';
  payload: null;
}
export const isProcessingFinishedResponse = (res: PastelogueResponse) : res is ProcessingFinishedResponse => (res.id === 'PROCESSING_FINISHED');

export type PastelogueResponse = (
  ProcessingStartedResponse |
  ProcessingProgressResponse |
  ProcessingFinishedResponse
);
