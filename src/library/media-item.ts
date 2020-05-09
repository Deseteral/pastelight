interface MediaItem {
  path: string,
  thumbnail: (ThumbnailInfo|null), // TODO: This should not be null
}

interface ThumbnailInfo {
  path: string,
}

export { MediaItem, ThumbnailInfo };
