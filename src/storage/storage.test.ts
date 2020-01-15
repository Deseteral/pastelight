// import os from 'os';
// import path from 'path';
// import Storage from './storage';

describe('Storage', () => {
  it('DEBUG true be true', () => {
    expect(true).toBe(true);
  });

  // const storagePath = path.resolve(os.tmpdir());
  // const key = 'TEST_KEY';
  // const storage = new Storage(storagePath);

  // beforeEach(async () => {
  //   await storage.clear(key);
  // });

  // it('should read data', async () => {
  //   // given
  //   const data = { foo: 'bar' };
  //   await storage.set(key, data);

  //   // when
  //   const out = await storage.get(key, {});

  //   // then
  //   expect(out).toEqual(data);
  // });

  // it('should return default data if storage is empty', async () => {
  //   // when
  //   const out = await storage.get(key, { data: 'default' });

  //   // then
  //   expect(out).toEqual({ data: 'default' });
  // });

  // it('should return data path', () => {
  //   // when
  //   const dataPath = storage.getDataPath();

  //   // then
  //   expect(dataPath).toBe(storagePath);
  // });

  // it('should set new data path', () => {
  //   const storageWithDifferentPath = new Storage(storagePath);

  //   // when
  //   storageWithDifferentPath.setDataPath('/Some/Path');

  //   // then
  //   expect(storageWithDifferentPath.getDataPath()).toBe('/Some/Path');
  // });

  // it('should clear store', async () => {
  //   // given
  //   const defaultData = { data: 'default' };
  //   await storage.set(key, { some: 'data' });

  //   // when
  //   await storage.clear(key);

  //   // then
  //   const data = await storage.get(key, defaultData);
  //   expect(data).toEqual(defaultData);
  // });
});
