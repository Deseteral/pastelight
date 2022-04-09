import os from 'os';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import { Storage } from '../storage';

describe('Storage', () => {
  const storagePath = path.resolve(os.tmpdir());
  const key = 'TEST_KEY';
  const storage = new Storage(storagePath);

  beforeEach(async () => {
    await storage.clear(key);
  });

  it('should read data', async () => {
    // given
    const data = { foo: 'bar' };
    await storage.set(key, data);

    // when
    const out = await storage.get(key, {});

    // then
    expect(out).toEqual(data);
  });

  it('should return default data if storage is empty', async () => {
    // when
    const out = await storage.get(key, { data: 'default' });

    // then
    expect(out).toEqual({ data: 'default' });
  });

  it('should return data path', () => {
    // when
    const dataPath = storage.getDataPath();

    // then
    expect(dataPath).toBe(storagePath);
  });

  it('should set new data path', async () => {
    // given
    const nextPath = path.resolve(os.tmpdir(), 'storagetestdir');
    const storageWithDifferentPath = new Storage(storagePath);

    // when
    await storageWithDifferentPath.setAndCreateDataPath(nextPath);

    // then
    expect(storageWithDifferentPath.getDataPath()).toBe(nextPath);
  });

  it('should create directories in path when after chaneging data path', async () => {
    // given
    const basePath = path.resolve(os.tmpdir(), 'storagetestdir');
    const testStoragePath = path.resolve(basePath, 'some', 'nested', 'dirs');
    const storageWithDifferentPath = new Storage(storagePath);

    // when then
    expect(fs.existsSync(testStoragePath)).toBe(false);

    // and
    await storageWithDifferentPath.setAndCreateDataPath(testStoragePath);

    // when then
    expect(fs.existsSync(testStoragePath)).toBe(true);

    // cleanup
    rimraf.sync(basePath);
  });

  it('should clear store', async () => {
    // given
    const defaultData = { data: 'default' };
    await storage.set(key, { some: 'data' });

    // when
    await storage.clear(key);

    // then
    const data = await storage.get(key, defaultData);
    expect(data).toEqual(defaultData);
  });
});
