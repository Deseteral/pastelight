import * as MediaItemGrouper from '../media-item-grouper';
import { MediaItem } from '../media-item';
import { MediaItemsGroup } from '../media-items-group';

function mockMediaItem(createdAtString: string): MediaItem {
  return {
    createdAt: new Date(createdAtString),
    relativePath: '',
    thumbnail: { relativePath: '' },
  };
}

describe('MediaItemGrouper', () => {
  it('should group media items', () => {
    // given
    const items: MediaItem[] = [
      mockMediaItem('2020-06-05T01:00:00Z'),
      mockMediaItem('2020-06-04T02:00:00Z'),
      mockMediaItem('2020-06-02T01:00:00Z'),
      mockMediaItem('2020-06-03T01:00:00Z'),
      mockMediaItem('2020-06-04T03:00:00Z'),
      mockMediaItem('2020-06-02T02:00:00Z'),
      mockMediaItem('2020-06-04T01:00:00Z'),
      mockMediaItem('2020-06-01T01:00:00Z'),
    ];

    // when
    const groups: MediaItemsGroup[] = MediaItemGrouper.groupMediaItems(items);

    // then
    expect(groups).toEqual([
      {
        title: 'Friday, June 5, 2020',
        items: [
          mockMediaItem('2020-06-05T01:00:00Z'),
        ],
      }, {
        title: 'Thursday, June 4, 2020',
        items: [
          mockMediaItem('2020-06-04T03:00:00Z'),
          mockMediaItem('2020-06-04T02:00:00Z'),
          mockMediaItem('2020-06-04T01:00:00Z'),
        ],
      }, {
        title: 'Wednesday, June 3, 2020',
        items: [
          mockMediaItem('2020-06-03T01:00:00Z'),
        ],
      }, {
        title: 'Tuesday, June 2, 2020',
        items: [
          mockMediaItem('2020-06-02T02:00:00Z'),
          mockMediaItem('2020-06-02T01:00:00Z'),
        ],
      }, {
        title: 'Monday, June 1, 2020',
        items: [
          mockMediaItem('2020-06-01T01:00:00Z'),
        ],
      },
    ]);
  });
});
