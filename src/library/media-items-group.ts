import { MediaItem } from './media-item';

interface MediaItemsGroup {
  title: string,
  items: MediaItem[],
}

interface MediaItemGroupPosition {
  groupIndex: number,
  itemIndex: number,
}

export { MediaItemsGroup, MediaItemGroupPosition };
