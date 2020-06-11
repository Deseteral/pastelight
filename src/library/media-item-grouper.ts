import { MediaItemsGroup } from './media-items-group';
import { MediaItem } from './media-item';
import * as DateUtils from '../utils/date-utils';

function groupByDate(list: MediaItem[]) : Map<string, MediaItem[]> {
  const map = new Map<string, MediaItem[]>();
  list.forEach((item) => {
    const key = DateUtils.toISODateStringUTC(item.createdAt);
    if (!map.has(key)) map.set(key, []);
    (map.get(key) as MediaItem[]).push(item);
  });
  return map;
}

function sortItems(items: (MediaItem[] | undefined)) : MediaItem[] {
  return (items as MediaItem[])
    .sort((a, b) => DateUtils.comparatorDescending(a.createdAt, b.createdAt));
}

// TODO: Move this off the main thread
function groupMediaItems(items: MediaItem[]) : MediaItemsGroup[] {
  const map = groupByDate(items);

  return Array.from(map.keys())
    .sort()
    .reverse()
    .map((key) => ({
      title: key,
      items: sortItems(map.get(key)),
    }));
}

export { groupMediaItems };
