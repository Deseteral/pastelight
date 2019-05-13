enum MediaType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}

interface PhotoMetadata {
  cameraModel: (string | null);
  fNumber: (string | null);
  exposureTime: (string | null);
  focalLength: (string | null);
  iso: (string | null);
}

interface GeoPosition {
  lat: number;
  lng: number;
  altitude: number;
  formatted: string,
}

interface MediaItem { // TODO: MediaItem might not be the best name
  type: MediaType;
  filePath: string;
  fileSizeBytes: number;
  date: string;
  width: number;
  height: number;
  megapixels: string;
  description: string;
  photoMetadata: (PhotoMetadata | null);
  geo: (GeoPosition | null);
}

export default MediaItem;
export {
  GeoPosition,
  PhotoMetadata,
  MediaType,
};
