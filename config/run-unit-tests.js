const { spawnSync } = require('child_process');

const IS_CI = !!process.env.CI;
const LOCAL_ONLY_ARGS = [
  '--watchAll',
  '--notify',
];

const args = [
  '--config', './config/jest.config.js',
  ...(IS_CI ? [] : LOCAL_ONLY_ARGS),
];

const out = spawnSync('jest', args, { stdio: 'inherit'  });
if (out.status !== 0) {
  process.exit(out.status);
}
