import { Logger } from '@pastelight/application/logger';
import Datastore from 'nedb';
import { join as pathJoin } from 'path';
import { MediaItem } from './media-item';

// TODO: Move this function outside of this module
function guardError(err: Error, reject: (err: Error) => void): boolean {
  if (err) {
    reject(err);
    return true;
  }
  return false;
}

class LibraryRepository {
  private db: Datastore<MediaItem>;

  constructor(libraryWorkingDirectoryPath: string) {
    const databaseFilePath = pathJoin(libraryWorkingDirectoryPath, 'data.db');
    Logger.info(`Loading database at "${databaseFilePath}"`);

    this.db = new Datastore<MediaItem>({ filename: databaseFilePath });
  }

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.loadDatabase((err) => {
        if (guardError(err, reject)) return; // TODO: Handle errors
        resolve();
      });
    });
  }

  async addNewItem(item: MediaItem): Promise<void> {
    const isItemSaved = await this.findItemByPath(item.relativePath);
    if (!isItemSaved) {
      await this.insert(item);
      Logger.info(`Added item to library "${item.relativePath}"`);
    }
  }

  getAllItems(): Promise<MediaItem[]> {
    return this.find({});
  }

  findItemByPath(filePath: string): Promise<MediaItem|null> {
    return this.findOne({ relativePath: filePath });
  }

  private insert(item: MediaItem): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.insert(item, (err) => {
        if (guardError(err, reject)) return;
        resolve();
      });
    });
  }

  private find(query: any): Promise<MediaItem[]> {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err: Error, items: MediaItem[]) => {
        if (guardError(err, reject)) return;
        resolve(items);
      });
    });
  }

  private findOne(query: any): Promise<MediaItem|null> {
    return new Promise((resolve, reject) => {
      this.db.findOne(query, (err: Error, item: (MediaItem|null)) => {
        if (guardError(err, reject)) return;
        resolve(item);
      });
    });
  }
}

export { LibraryRepository };
