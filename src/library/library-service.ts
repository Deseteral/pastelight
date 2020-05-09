import { MediaItem } from './media-item';
import { Library } from './library';

class LibraryService {
  private library: Library;

  constructor(library: Library) {
    this.library = library;
  }

  async addMediaItemFromPath(path: string) : Promise<MediaItem|null> {
    const itemAlreadyExists = !!(await this.library.findItemByPath(path));

    if (itemAlreadyExists) return null;

    const item = {
      path,
      thumbnail: null,
    };

    await this.library.addNewItem(item);
    return item;
  }
}

export default LibraryService;
