const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const fetch = require('node-fetch');
const rimraf = require('rimraf');

const CURRENT_PLATFORM = (() => {
  switch (process.platform) {
    case 'darwin': return 'macos';
    case 'win32': return 'windows';
    default: return null;
  }
})();

const logger = console.log; // eslint-disable-line no-console
const rmrf = (pathToRemove) => rimraf.sync(pathToRemove);
const mkdir = (pathToCreate) => fs.mkdirSync(pathToCreate);
const getForPlatform = (platformData) => platformData[CURRENT_PLATFORM] || null;
const shell = (cmd) => spawnSync(cmd.split(' ')[0], cmd.split(' ').slice(1), { stdio: 'inherit' });

async function downloadFile(url, filePath) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
}

function extractArchive(filePath, outputPath) {
  if (CURRENT_PLATFORM === 'macos') {
    return shell(`tar xzf ${filePath} -C ${outputPath} --strip-components 1`);
  }
  if (CURRENT_PLATFORM === 'windows') {
    return shell('echo "not implemented"'); // TODO: Add Windows support
  }
  return null;
}

async function pastelogue() {
  const version = 'v0.2.0';
  const platform = getForPlatform({
    macos: 'MacOS',
    windows: 'Windows',
  });
  const extension = getForPlatform({
    macos: 'tar.gz',
    windows: 'zip',
  });
  const url = `https://github.com/Deseteral/pastelogue/releases/download/${version}/pastelogue_${version}_${platform}.${extension}`;
  const archivePath = `./native/pastelogue.${extension}`;

  logger(`Downloading pastelogue ${version} for ${platform}`);

  mkdir('./native/pastelogue');
  await downloadFile(url, archivePath);
  await extractArchive(archivePath, './native/pastelogue');
  rmrf(archivePath);

  logger('Done');
}

(async function main() {
  logger('Installing native binary dependencies...');

  rmrf('./native');
  mkdir('./native');

  await pastelogue();

  logger('All done!');
}());
