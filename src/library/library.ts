import Datastore from 'nedb';
import path from 'path';

interface MediaItem {
  path: string;
}

// TODO: Move this function outside of this module
function guardError(err: Error, reject: (err: Error) => void) : boolean {
  if (err) {
    reject(err);
    return true;
  }
  return false;
}

class Library {
  public readonly rootDirectoryPath: string;
  private db: Datastore;

  constructor(libraryPath: string) {
    this.rootDirectoryPath = libraryPath;
    this.db = new Datastore({
      filename: path.join(libraryPath, 'data.db'),
    });
  }

  load() : Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.loadDatabase((err) => {
        if (guardError(err, reject)) return; // TODO: Handle errors
        resolve();
      });
    });
  }

  async addNewItem(item: MediaItem) : Promise<void> {
    const savedItem = await this.findOne({ path: item.path });
    if (!savedItem) {
      this.insert(item);
    }
  }

  getAllItems() : Promise<MediaItem[]> {
    return this.find({});
  }

  private insert(item: MediaItem) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.insert(item, (err) => {
        if (guardError(err, reject)) return;
        resolve();
      });
    });
  }

  private find(query: any) : Promise<MediaItem[]> {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err: Error, items: MediaItem[]) => {
        if (guardError(err, reject)) return;
        resolve(items);
      });
    });
  }

  private findOne(query: any) : Promise<MediaItem> {
    return new Promise((resolve, reject) => {
      this.db.findOne(query, (err: Error, item: MediaItem) => {
        if (guardError(err, reject)) return;
        resolve(item);
      });
    });
  }
}

export { Library, MediaItem };
