import fs from 'fs';
import path from 'path';
import util from 'util';

// TODO: Generalize those; Node has promisifed variants of those methods I think
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);
const mkdir = util.promisify(fs.mkdir);

const DEFAULT_GLOBAL_DATA_PATH = process.cwd();

class Storage {
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

    const data = await readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  async set<T>(key: string, value: T) : Promise<void> {
    const filePath = this.getFilePath(key);
    await writeFile(filePath, JSON.stringify(value), { encoding: 'utf8' });
  }

  clear(key: string) : Promise<void> {
    const filePath = this.getFilePath(key);
    return fs.existsSync(filePath)
      ? unlink(this.getFilePath(key))
      : Promise.resolve();
  }

  async setAndCreateDataPath(nextDataPath: string) : Promise<void> {
    await mkdir(nextDataPath, { recursive: true });
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
