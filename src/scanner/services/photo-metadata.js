import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { promisify } from 'util';
import { ExifImage } from 'exif';
import dms2dec from 'dms2dec';

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

function calculateMegapixels(width, height) {
  return ((width * height) / 1000000).toFixed(1);
}

function prettyPrintGeoCoordinates(coords, ref) {
  return `${coords[0]}°${coords[1]}'${coords[2]}"${ref}`;
}

function getGeoPositionData(exifData) {
  const {
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
    GPSAltitude,
  } = exifData.gps;

  const [lat, lng] = dms2dec(
    GPSLatitude, GPSLatitudeRef,
    GPSLongitude, GPSLongitudeRef,
  );

  const formatted = [
    prettyPrintGeoCoordinates(GPSLatitude, GPSLatitudeRef),
    prettyPrintGeoCoordinates(GPSLongitude, GPSLongitudeRef),
  ].join(' ');

  return {
    lat,
    lng,
    altitude: GPSAltitude,
    formatted,
  };
}

async function getPhotoMetadata(filePath) {
  const fullPath = pathResolve(filePath);

  const stats = await readFileStats(fullPath);
  const exifData = await readExifData({ image: fullPath });

  const fileSizeBytes = stats.size;
  const width = exifData.exif.ExifImageWidth;
  const height = exifData.exif.ExifImageHeight;

  return {
    filePath: fullPath,
    fileSizeBytes,
    date: exifDateToIso(exifData.exif.CreateDate),
    width,
    height,
    megapixels: calculateMegapixels(width, height),
    description: '',
    categoryId: null,
    tags: [],
    cameraModel: exifData.image.Model,
    fNumber: exifData.exif.FNumber.toString(),
    exposureTime: calculateExposureTime(exifData.exif.ExposureTime),
    focalLength: exifData.exif.FocalLength.toString(),
    iso: exifData.exif.ISO.toString(),
    geo: getGeoPositionData(exifData),
  };
}

export { getPhotoMetadata };
