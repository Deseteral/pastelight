import * as MediaItemGrouper from '../media-item-grouper';
import { MediaItem } from '../media-item';
import { MediaItemsGroup } from '../media-items-group';

function mockMediaItem(createdAt: Date) : MediaItem {
  return {
    createdAt,
    relativePath: '',
    thumbnail: { relativePath: '' },
  };
}

describe('MediaItemGrouper', () => {
  it('should group media items', () => {
    // given
    const items: MediaItem[] = [
      mockMediaItem(new Date('2020-06-05')),
      mockMediaItem(new Date('2020-06-04')),
      mockMediaItem(new Date('2020-06-02')),
      mockMediaItem(new Date('2020-06-03')),
      mockMediaItem(new Date('2020-06-04')),
      mockMediaItem(new Date('2020-06-02')),
      mockMediaItem(new Date('2020-06-04')),
      mockMediaItem(new Date('2020-06-01')),
    ];

    // when
    const groups: MediaItemsGroup[] = MediaItemGrouper.groupMediaItems(items);

    // then
    expect(groups).toEqual([
      {
        title: '2020-06-05',
        items: [
          mockMediaItem(new Date('2020-06-05')),
        ],
      }, {
        title: '2020-06-04',
        items: [
          mockMediaItem(new Date('2020-06-04')),
          mockMediaItem(new Date('2020-06-04')),
          mockMediaItem(new Date('2020-06-04')),
        ],
      }, {
        title: '2020-06-03',
        items: [
          mockMediaItem(new Date('2020-06-03')),
        ],
      }, {
        title: '2020-06-02',
        items: [
          mockMediaItem(new Date('2020-06-02')),
          mockMediaItem(new Date('2020-06-02')),
        ],
      }, {
        title: '2020-06-01',
        items: [
          mockMediaItem(new Date('2020-06-01')),
        ],
      },
    ]);
  });
});
