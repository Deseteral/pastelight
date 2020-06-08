import { MediaItem } from './media-item';
import { generateThumbnail } from '../thumbnailer';
import { LibraryRepository } from './library-repository';
import { AppContextPaths } from '../application';
import { toRelativePath } from './path-converter';
import * as MediaItemGrouper from './media-item-grouper';
import { MediaItemsGroup } from './media-items-group';

class LibraryService {
  private libraryRepository: LibraryRepository;
  private paths: AppContextPaths;

  constructor(libraryRepository: LibraryRepository, paths: AppContextPaths) {
    this.libraryRepository = libraryRepository;
    this.paths = paths;
  }

  async addMediaItemFromPath(filePath: string) : Promise<MediaItem|null> {
    // Check if item with this file path already exists in the database
    const relativePath = toRelativePath(filePath, this.paths);
    const itemAlreadyExists = !!(await this.libraryRepository.findItemByPath(relativePath));
    if (itemAlreadyExists) return null;

    // Generate thumbnail
    const thumbnail = await generateThumbnail(filePath, this.paths);

    // Save item to database
    const item: MediaItem = {
      relativePath,
      thumbnail,
    };
    await this.libraryRepository.addNewItem(item);

    return item;
  }

  async getAllMediaItems() : Promise<MediaItemsGroup[]> {
    const items = await this.libraryRepository.getAllItems();
    return MediaItemGrouper.groupMediaItems(items);
  }
}

export default LibraryService;
