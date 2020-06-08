import * as MediaItemGrouper from '../media-item-grouper';
import { MediaItem } from '../media-item';
import { MediaItemsGroup } from '../media-items-group';

describe('MediaItemGrouper', () => {
  it('should group media items', () => {
    // given
    const items: MediaItem[] = [
      { relativePath: '', thumbnail: { relativePath: '' } },
    ];

    // when
    const groups: MediaItemsGroup[] = MediaItemGrouper.groupMediaItems(items);

    // then
    expect(groups).toEqual([
      { title: 'Photos', items },
    ]);
  });
});
