import { MediaItemsGroup } from './media-items-group';
import { MediaItem } from './media-item';

function groupByDate(list: MediaItem[]) : Map<string, MediaItem[]> {
  const map = new Map<string, MediaItem[]>();
  list.forEach((item) => {
    const key = item.createdAt.toISOString().slice(0, 10);
    if (!map.has(key)) map.set(key, []);
    (map.get(key) as MediaItem[]).push(item);
  });
  return map;
}

// TODO: Move this off the main thread
function groupMediaItems(items: MediaItem[]) : MediaItemsGroup[] {
  const map = groupByDate(items);

  return Array.from(map.keys())
    .sort()
    .reverse()
    .map((key) => ({
      title: key,
      items: (map.get(key) as MediaItem[]),
    }));
}

export { groupMediaItems };
