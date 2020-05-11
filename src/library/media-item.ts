interface MediaItem {
  relativePath: string,
  thumbnail: ThumbnailInfo,
}

interface ThumbnailInfo {
  relativePath: string,
}

export { MediaItem, ThumbnailInfo };
