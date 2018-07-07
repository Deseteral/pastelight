import { resolve as pathResolve } from 'path';
import { getPhotoMetadata } from '../photo-metadata';

describe('Photo metadata service', () => {
  it('should extract photo metadata given file path', async () => {
    // given
    const path = `${__dirname}/resources/example.jpg`;

    // when
    const metadata = await getPhotoMetadata(path);

    // then
    expect(metadata).toEqual({
      filePath: pathResolve(path),
      fileSizeBytes: 5720363,
      date: '2018-04-29T12:32:44',
      description: '',
      categoryId: null,
      tags: [],
      cameraModel: 'ONEPLUS A3003',
      fNumber: '2',
      exposureTime: '1/1668',
      focalLength: '4.26',
      iso: '100',
    });
  });

  it('should reject when given file does not exist', (done) => {
    // given
    const path = '/not/existing/path';

    // when
    getPhotoMetadata(path).catch((err) => {
      // then
      expect(err.toString())
        .toBe("Error: ENOENT: no such file or directory, stat '/not/existing/path'");

      done();
    });
  });

  it('should reject when given file is not a photo or does not contain exif data', (done) => {
    // given
    const path = `${__dirname}/resources/not-a-photo.txt`;

    // when
    getPhotoMetadata(path).catch((err) => {
      // then
      expect(err.toString())
        .toBe('Error: The given image is not a JPEG and thus unsupported right now.');

      done();
    });
  });
});
