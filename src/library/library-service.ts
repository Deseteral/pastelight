import { MediaItem } from './media-item';
import { generateThumbnail } from '../thumbnailer';
import { Library } from './library';
import { AppContextPaths } from '../application';
import { toRelativePath } from './path-converter';

class LibraryService {
  private library: Library;
  private paths: AppContextPaths;

  constructor(library: Library, paths: AppContextPaths) {
    this.library = library;
    this.paths = paths;
  }

  async addMediaItemFromPath(filePath: string) : Promise<MediaItem|null> {
    // Check if item with this file path already exists in the database
    const relativePath = toRelativePath(filePath, this.paths);
    const itemAlreadyExists = !!(await this.library.findItemByPath(relativePath));
    if (itemAlreadyExists) return null;

    // Generate thumbnail
    const thumbnail = await generateThumbnail(filePath, this.paths);

    // Save item to database
    const item: MediaItem = {
      relativePath,
      thumbnail,
    };
    await this.library.addNewItem(item);

    return item;
  }
}

export default LibraryService;
