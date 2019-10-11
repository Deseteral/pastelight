enum MediaType {
  Photo = 'PHOTO',
  Video = 'VIDEO',
}

interface PhotoMetadata {
  cameraModel: (string | null);
  fNumber: (string | null);
  exposureTime: (string | null);
  focalLength: (string | null);
  iso: (string | null);
}

type VideoMetadata = null; // TODO: Support video

interface GeoPosition {
  lat: number;
  lng: number;
  altitude: number;
}

interface MediaItem { // TODO: MediaItem might not be the best name
  type: MediaType;
  filePath: string; // TODO: but is it absolute or relative?
  fileSizeBytes: number;
  date: string; // TODO: maybe dateIso or Date?
  width: number;
  height: number;
  megapixels: string;
  description: string;
  photoMetadata: (PhotoMetadata | null);
  videoMetadata: (VideoMetadata | null);
  geo: (GeoPosition | null);
}

export default MediaItem;
export {
  GeoPosition,
  PhotoMetadata,
  MediaType,
};
