import fs from 'fs';
import { promisify } from 'util';
import { ExifImage, ExifData } from 'exif';
import dms2dec from 'dms2dec';
import getImageSize from 'image-size';
import MediaItem, { MediaType, GeoPosition, PhotoMetadata } from '../domain/media-item';

const readFileStats = promisify(fs.stat);
const readExifData = promisify(ExifImage);

async function getExifData(path: string) { // TODO: This function returns Promise<any> FIX IT!
  try {
    return await readExifData({ image: path });
  } catch (ex) {
    return null;
  }
}

function exifDateToIso(exifDate: string) : string {
  // 2018:04:29 12:32:44
  const [date, time] = exifDate.split(' ');
  const formattedDate = date.replace(/:/g, '-');

  return `${formattedDate}T${time}`;
}

function getPhotoDate(exifData: ExifData, fileStats: fs.Stats) : string {
  if (exifData && exifData.exif && exifData.exif.CreateDate) {
    return exifDateToIso(exifData.exif.CreateDate);
  }

  return fileStats.birthtime.toISOString();
}

function calculateExposureTime(exposureTime: number) : string {
  return `1/${Math.floor((1 / exposureTime))}`;
}

function calculateMegapixels(width: number, height: number) : string {
  return ((width * height) / 1000000).toFixed(1);
}

function prettyPrintGeoCoordinates(coords: number[], ref: string) : string {
  return `${coords[0]}°${coords[1]}'${coords[2]}"${ref}`;
}

function getGeoPositionData(exifData: ExifData) : (GeoPosition | null) {
  if (!exifData || !exifData.gps) return null;

  const {
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
    GPSAltitude,
  } = exifData.gps;

  if (
    !GPSLatitude ||
    !GPSLatitudeRef ||
    !GPSLongitude ||
    !GPSLongitudeRef ||
    !GPSAltitude
  ) return null;

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

function getPhotoMetadata(exifData: ExifData) : (PhotoMetadata | null) {
  if (!exifData) return null;
  const { image, exif } = exifData;

  const cameraModel = image && image.Model;
  const fNumber = exif && exif.FNumber && exif.FNumber.toString();
  const exposureTime = exif && exif.ExposureTime && calculateExposureTime(exif.ExposureTime);
  const focalLength = exif && exif.FocalLength && exif.FocalLength.toString();
  const iso = exif && exif.ISO && exif.ISO.toString();

  return {
    cameraModel: cameraModel || null,
    fNumber: fNumber || null,
    exposureTime: exposureTime || null,
    focalLength: focalLength || null,
    iso: iso || null,
  };
}

async function buildPhotoItem(path: string) : Promise<MediaItem> {
  const stats = await readFileStats(path);

  try {
    const { width, height } = await getImageSize(path);
    const exifData = await getExifData(path);

    return {
      type: MediaType.PHOTO,
      filePath: path,
      fileSizeBytes: stats.size,
      date: getPhotoDate(exifData, stats),
      width,
      height,
      megapixels: calculateMegapixels(width, height),
      description: '',
      photoMetadata: getPhotoMetadata(exifData),
      geo: getGeoPositionData(exifData),
    };
  } catch (ex) {
    throw new Error('Given file is not an image');
  }
}

export { buildPhotoItem };
