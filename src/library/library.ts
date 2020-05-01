import Datastore from 'nedb';
import path from 'path';

interface MediaItem {
  path: string;
}

function guardError(err: Error, reject: (err: Error) => void) : boolean {
  if (err) {
    reject(err);
    return true;
  }
  return false;
}

class Library {
  private db: Datastore;

  constructor(libraryPath: string) {
    const dbFilename = path.join(libraryPath, 'data.db');
    this.db = new Datastore({ filename: dbFilename });
  }

  load() : Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.loadDatabase((err) => {
        if (guardError(err, reject)) return; // TODO: Handle error
        resolve();
      });
    });
  }

  addNewItem(item: MediaItem) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.insert(item, (err) => {
        if (guardError(err, reject)) return;
        resolve();
      });
    });
  }

  getAllItems() : Promise<MediaItem[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err: Error, items: MediaItem[]) => {
        if (guardError(err, reject)) return;
        resolve(items);
      });
    });
  }
}

export { Library, MediaItem };
