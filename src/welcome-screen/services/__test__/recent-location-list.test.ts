import os from 'os';
import { Storage } from '../../../storage';
import * as RecentLocationListService from '../recent-location-list';

describe('Recent location list service', () => {
  beforeEach(async () => {
    Storage.process.setDataPath(os.tmpdir());
    await Storage.process.clear('recentLocations');
  });

  it('should return empty list by default', async () => {
    // when
    const list = await RecentLocationListService.getRecentLocationList();

    // then
    expect(list).toEqual([]);
  });

  it('should add new location to the list', async () => {
    // given
    const location: RecentLocationListService.RecentLocation = {
      path: '/Some/test/path',
      title: 'path',
    };

    // when
    await RecentLocationListService.addNewLocation(location);

    // then
    const list = await RecentLocationListService.getRecentLocationList();
    expect(list).toEqual([location]);
  });

  it('should not duplicate existing location and make it first one', async () => {
    // given
    const location1: RecentLocationListService.RecentLocation = { path: '/path1', title: 'path1' };
    const location2: RecentLocationListService.RecentLocation = { path: '/path2', title: 'path2' };
    const location3: RecentLocationListService.RecentLocation = { path: '/path3', title: 'path3' };

    // when
    await RecentLocationListService.addNewLocation(location3);
    await RecentLocationListService.addNewLocation(location2);
    await RecentLocationListService.addNewLocation(location1);

    // then
    const list = await RecentLocationListService.getRecentLocationList();
    expect(list).toEqual([
      location1,
      location2,
      location3,
    ]);

    // and
    await RecentLocationListService.addNewLocation(location2);

    // then
    const nextList = await RecentLocationListService.getRecentLocationList();
    expect(nextList).toEqual([
      location2,
      location1,
      location3,
    ]);
  });
});
