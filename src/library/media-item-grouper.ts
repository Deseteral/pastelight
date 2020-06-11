import { MediaItemsGroup } from './media-items-group';
import { MediaItem } from './media-item';

// TODO: Move to separate module
function dateToISOStringUTC(d: Date) : string {
  const yyyy = d.getUTCFullYear();
  const mm = (d.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd = d.getUTCDay().toString().padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const formattedTime = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
    .map((e) => e.toString())
    .map((s) => s.padStart(2, '0'))
    .join(':');

  return `${formattedDate}T${formattedTime}Z`;
}

// TODO: Move to separate module
function dateToISODateStringUTC(d: Date) : string {
  return dateToISOStringUTC(d).slice(0, 10);
}

// TODO: Move to separate module
function dateComparatorDescending(a: MediaItem, b: MediaItem) : (-1 | 0 | 1) {
  if (a.createdAt > b.createdAt) return -1;
  if (a.createdAt < b.createdAt) return 1;
  return 0;
}

function groupByDate(list: MediaItem[]) : Map<string, MediaItem[]> {
  const map = new Map<string, MediaItem[]>();
  list.forEach((item) => {
    const key = dateToISODateStringUTC(item.createdAt);
    if (!map.has(key)) map.set(key, []);
    (map.get(key) as MediaItem[]).push(item);
  });
  return map;
}

function sortItems(items: (MediaItem[] | undefined)) : MediaItem[] {
  return (items as MediaItem[]).sort(dateComparatorDescending);
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
