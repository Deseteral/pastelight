import fs, { promises as fsp } from 'fs';
import path from 'path';

const DEFAULT_GLOBAL_DATA_PATH = process.cwd();

class Storage { // TODO: Rename and move to application module
  static process: Storage = new Storage(DEFAULT_GLOBAL_DATA_PATH);

  private dataPath: string;

  constructor(dataPath: string) {
    this.dataPath = dataPath;
  }

  async get<T>(key: string, defaultValue: T) : Promise<T> {
    const filePath = this.getFilePath(key);

    // TODO: Sync function call - this might become a performance problem
    if (!fs.existsSync(filePath)) {
      await this.set<T>(key, defaultValue);
      return defaultValue;
    }

    const data = await fsp.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  async set<T>(key: string, value: T) : Promise<void> {
    const filePath = this.getFilePath(key);
    await fsp.writeFile(filePath, JSON.stringify(value), { encoding: 'utf8' });
  }

  clear(key: string) : Promise<void> {
    const filePath = this.getFilePath(key);
    return fs.existsSync(filePath)
      ? fsp.unlink(this.getFilePath(key))
      : Promise.resolve();
  }

  async setAndCreateDataPath(nextDataPath: string) : Promise<void> {
    await fsp.mkdir(nextDataPath, { recursive: true });
    this.dataPath = nextDataPath;
  }

  getDataPath() : string {
    return this.dataPath;
  }

  private getFilePath(key: string) : string { // TODO: Cache this lol
    return path.resolve(this.dataPath, `${key}.json`);
  }
}

export default Storage;
