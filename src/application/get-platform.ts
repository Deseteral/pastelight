type Platform = 'windows' | 'mac' | 'linux' | 'unsupported';

function getPlatform(): Platform {
  switch (process.platform) {
    case 'win32': return 'windows';
    case 'darwin': return 'mac';
    case 'linux': return 'linux';
    default: return 'unsupported';
  }
}

export default getPlatform;
