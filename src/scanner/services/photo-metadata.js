import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { promisify } from 'util';
import { ExifImage } from 'exif';

const readFileStats = promisify(fs.stat);
const readExifData = promisify(ExifImage);

function exifDateToIso(exifDate) {
  // 2018:04:29 12:32:44
  const [date, time] = exifDate.split(' ');
  const formattedDate = date.replace(/:/g, '-');

  return `${formattedDate}T${time}`;
}

function calculateExposureTime(exposureTime) {
  const denominator = parseInt((1 / exposureTime), 10);
  return `1/${denominator}`;
}

async function getPhotoMetadata(filePath) {
  const fullPath = pathResolve(filePath);

  const stats = await readFileStats(fullPath);
  const exifData = await readExifData({ image: fullPath });

  const fileSizeBytes = stats.size;

  console.log(exifData);

  return {
    filePath: fullPath,
    fileSizeBytes,
    date: exifDateToIso(exifData.exif.CreateDate),
    description: '',
    categoryId: null,
    tags: [],
    cameraModel: exifData.image.Model,
    fNumber: exifData.exif.FNumber.toString(),
    exposureTime: calculateExposureTime(exifData.exif.ExposureTime),
    focalLength: exifData.exif.FocalLength.toString(),
    iso: exifData.exif.ISO.toString(),
  };
}

export { getPhotoMetadata };
