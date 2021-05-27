import { toRelativePath, toFullPath, relativeToThumbnailPath, pathToThumbnailPath } from '../path-converter';
import { AppContextPaths } from '../../application/app-context';

describe('Library file path converter', () => {
  const paths: AppContextPaths = {
    libraryPath: '/Users/some.user/Pictures/Photos',
    libraryWorkingDirectoryPath: '/Users/some.user/Pictures/Photos/.pastelight',
    thumbnails: '/Users/some.user/Pictures/Photos/.pastelight/thumbnails',
  };

  it('should map full file path to library relative path', () => {
    // given
    const fullPath = '/Users/some.user/Pictures/Photos/2020/05/11/photo.jpg';

    // when
    const relativePath = toRelativePath(fullPath, paths);

    // then
    expect(relativePath).toBe('/2020/05/11/photo.jpg');
  });

  it('should map relative library file path to full path', () => {
    // given
    const relativePath = '/2020/05/11/photo.jpg';

    // when
    const fullPath = toFullPath(relativePath, paths);

    // then
    expect(fullPath).toBe('/Users/some.user/Pictures/Photos/2020/05/11/photo.jpg');
  });

  describe('thumbnails', () => {
    it('should map relative path to full thumbnail path', () => {
      // given
      const relativePath = '/2020/05/11/photo.jpg';

      // when
      const fullThumbnailPath = relativeToThumbnailPath(relativePath, paths);

      // then
      expect(fullThumbnailPath).toBe('/Users/some.user/Pictures/Photos/.pastelight/thumbnails/2020/05/11/photo.jpg');
    });

    it('should map full path to full thumbnail path', () => {
      // given
      const fullPath = '/Users/some.user/Pictures/Photos/2020/05/11/photo.jpg';

      // when
      const fullThumbnailPath = pathToThumbnailPath(fullPath, paths);

      // then
      expect(fullThumbnailPath).toBe('/Users/some.user/Pictures/Photos/.pastelight/thumbnails/2020/05/11/photo.jpg');
    });
  });
});
