import { MediaItem } from './media-item';
import { generateThumbnail } from '../thumbnailer';
import { Library } from './library';

class LibraryService {
  private library: Library;
  private libraryPath: string;
  private libraryWorkingDirectoryPath: string;

  constructor(library: Library, libraryPath: string, libWorkingDirPath: string) {
    this.library = library;
    this.libraryPath = libraryPath;
    this.libraryWorkingDirectoryPath = libWorkingDirPath;
  }

  async addMediaItemFromPath(filePath: string) : Promise<MediaItem|null> {
    // Check if item with this file path already exists in the database
    const itemAlreadyExists = !!(await this.library.findItemByPath(filePath));
    if (itemAlreadyExists) return null;

    // Generate thumbnail
    const thumbnail = await generateThumbnail(
      filePath,
      this.libraryPath,
      this.libraryWorkingDirectoryPath,
    );

    // Save item to database
    const item: MediaItem = {
      path: filePath,
      thumbnail,
    };
    await this.library.addNewItem(item);

    return item;
  }
}

export default LibraryService;
