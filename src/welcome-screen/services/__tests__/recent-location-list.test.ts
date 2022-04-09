import os from 'os';
import { Storage } from '../../../storage/storage';
import * as RecentLocationListService from '../recent-location-list';

describe('Recent location list service', () => {
  beforeEach(async () => {
    await Storage.process.setAndCreateDataPath(os.tmpdir());
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
    const path = '/Some/test/path/My Photos';

    // when
    await RecentLocationListService.addNewLocationFromPath(path);

    // then
    const list = await RecentLocationListService.getRecentLocationList();
    expect(list).toEqual([
      { path, title: 'My Photos' },
    ]);
  });

  it('should not duplicate existing location and make it first one', async () => {
    // given
    const path1 = '/Test/path1/foo';
    const path2 = '/Test/path2/bar';
    const path3 = '/Test/path3/baz';

    // when
    await RecentLocationListService.addNewLocationFromPath(path3);
    await RecentLocationListService.addNewLocationFromPath(path2);
    await RecentLocationListService.addNewLocationFromPath(path1);

    // then
    const list = await RecentLocationListService.getRecentLocationList();
    expect(list).toEqual([
      { path: path1, title: 'foo' },
      { path: path2, title: 'bar' },
      { path: path3, title: 'baz' },
    ]);

    // and
    await RecentLocationListService.addNewLocationFromPath(path2);

    // then
    const nextList = await RecentLocationListService.getRecentLocationList();
    expect(nextList).toEqual([
      { path: path2, title: 'bar' },
      { path: path1, title: 'foo' },
      { path: path3, title: 'baz' },
    ]);
  });
});
