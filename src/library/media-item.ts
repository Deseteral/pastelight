interface MediaItem {
  relativePath: string,
  thumbnail: ThumbnailInfo,
  createdAt: Date,
}

interface ThumbnailInfo {
  relativePath: string,
}

export { MediaItem, ThumbnailInfo };
