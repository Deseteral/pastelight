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
  return Storage.global.set<RecentLocationData>(DATA_KEY, data);
}

async function getRecentLocationList(): Promise<RecentLocation[]> {
  const data = await Storage.global.get<RecentLocationData>(DATA_KEY, { list: [] });
  return data.list;
}

async function addNewLocation(location: RecentLocation): Promise<void> {
  const list = await getRecentLocationList();
  const idx = list.findIndex((el) => el.path === location.path);

  if (idx === -1) {
    const newList = [location, ...list];
    setRecentLocationList(newList);
  } else {
    const listWithoutNewItem = list.slice();
    listWithoutNewItem.splice(idx, 1);

    setRecentLocationList([location, ...listWithoutNewItem]);
  }
}

export { getRecentLocationList, addNewLocation };
export { RecentLocation };
