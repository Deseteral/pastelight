/* eslint-disable no-use-before-define */
import { resolve as pathResolve } from 'path';
import { buildPhotoLibrary } from '../photo-item-builder';

describe('Photo library item builder', () => {
  it('should create photo library item given file path', async () => {
    // given
    const path = getTestResourcePath('example.jpg');

    // when
    const metadata = await buildPhotoLibrary(path);

    // then
    expect(metadata).toEqual({
      type: 'PHOTO',
      filePath: path,
      fileSizeBytes: 5720363,
      date: '2018-04-29T12:32:44',
      width: 4640,
      height: 3480,
      megapixels: '16.1',
      description: '',
      categoryId: null,
      tags: [],
      photoMetadata: {
        cameraModel: 'ONEPLUS A3003',
        fNumber: '2',
        exposureTime: '1/1668',
        focalLength: '4.26',
        iso: '100',
      },
      geo: {
        lat: 49.221336916666665,
        lng: 20.230778305555553,
        altitude: 1643,
        formatted: '49°13\'16.8129"N 20°13\'50.8019"E',
      },
    });
  });

  it('should reject when given file does not exist', (done) => {
    // given
    const path = '/not/existing/path';

    // when
    buildPhotoLibrary(path).catch((err) => {
      // then
      expect(err.toString())
        .toBe("Error: ENOENT: no such file or directory, stat '/not/existing/path'");

      done();
    });
  });

  it('should reject when given file is not a photo or does not contain exif data', (done) => {
    // given
    const path = getTestResourcePath('not-a-photo.txt');

    // when
    buildPhotoLibrary(path).catch((err) => {
      // then
      expect(err.toString())
        .toBe('Error: The given image is not a JPEG and thus unsupported right now.');

      done();
    });
  });

  it.skip('should get metadata from not geotagged photo', () => {
    // TODO: write the test
  });

  it.skip('should get some metadata from photo without exif data', () => {
    // TODO: write the test
  });
});

function getTestResourcePath(fileName) {
  return pathResolve(`${__dirname}/resources/${fileName}`);
}
