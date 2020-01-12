import storage from 'electron-json-storage';

const DATA_KEY = 'recentLocations';

interface RecentLocation {
  path: string;
  elementsCount: number;
}

interface RecentLocationData {
  list: RecentLocation[];
}

function setRecentLocationList(list: RecentLocation[]): Promise<void> {
  return new Promise((resolve) => {
    const data: RecentLocationData = { list };
    storage.set(DATA_KEY, data, () => resolve());
  });
}

function getRecentLocationList(): Promise<RecentLocation[]> {
  return new Promise((resolve) => {
    storage.get(DATA_KEY, (err, data) => {
      if (err) {
        resolve([]);
        return;
      }

      const { list } = (data as RecentLocationData);
      if (list) {
        resolve(list);
      } else {
        setRecentLocationList([]).then(() => resolve([]));
      }
    });
  });
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

export { getRecentLocationList, addNewLocation, RecentLocation };
