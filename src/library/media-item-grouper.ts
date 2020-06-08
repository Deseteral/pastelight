import { MediaItemsGroup } from './media-items-group';
import { MediaItem } from './media-item';

// TODO: Move this off the main thread
function groupMediaItems(items: MediaItem[]) : MediaItemsGroup[] {
  return [{
    title: 'Photos',
    items,
  }];
}

export { groupMediaItems };
