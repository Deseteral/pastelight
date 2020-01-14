import fs from 'fs';
import path from 'path';
import util from 'util';
import rimraf from 'rimraf';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rmrf = util.promisify(rimraf);

const DEFAULT_GLOBAL_DATA_PATH = process.cwd();

class Storage {
  private dataPath: string;
  static global: Storage = new Storage(DEFAULT_GLOBAL_DATA_PATH);

  constructor(dataPath: string) {
    this.dataPath = dataPath;
  }

  async get<T>(key: string, defaultValue: T) : Promise<T> {
    const filePath = path.resolve(this.dataPath, `${key}.json`);

    // TODO: Sync function call - this might become a performance problem
    if (!fs.existsSync(filePath)) {
      await this.set<T>(key, defaultValue);
      return defaultValue;
    }

    const data = await readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  async set<T>(key: string, value: T) : Promise<void> {
    const filePath = path.resolve(this.dataPath, `${key}.json`);
    await writeFile(filePath, JSON.stringify(value), { encoding: 'utf8' });
  }

  clear(key: string) : Promise<void> {
    const filePath = path.resolve(this.dataPath, `${key}.json`);
    return rmrf(filePath);
  }

  setDataPath(nextDataPath: string) {
    this.dataPath = nextDataPath;
  }

  getDataPath() : string {
    return this.dataPath;
  }
}

export default Storage;
