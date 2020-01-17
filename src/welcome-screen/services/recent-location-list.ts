import path from 'path';
import { Storage } from '../../storage';

const DATA_KEY = 'recentLocations';

interface RecentLocation {
  title: string;
  path: string;
}

interface RecentLocationData {
  list: RecentLocation[];
}

async function setRecentLocationList(list: RecentLocation[]): Promise<void> {
  const data: RecentLocationData = { list };
  await Storage.process.set<RecentLocationData>(DATA_KEY, data);
}

async function getRecentLocationList(): Promise<RecentLocation[]> {
  const data = await Storage.process.get<RecentLocationData>(DATA_KEY, { list: [] });
  return data.list;
}

async function addNewLocationFromPath(nextPath: string): Promise<void> {
  const location: RecentLocation = {
    path: nextPath,
    title: path.basename(nextPath),
  };

  const list = await getRecentLocationList();
  const idx = list.findIndex((el) => el.path === location.path);

  const newList = (idx === -1)
    ? [location, ...list]
    : [list[idx], ...list.slice(0, idx), ...list.slice(idx + 1)];

  await setRecentLocationList(newList);
}

export { getRecentLocationList, addNewLocationFromPath };
export { RecentLocation };
