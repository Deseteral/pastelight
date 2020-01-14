const { spawnSync } = require('child_process');
const path = require('path');

const IS_CI = !!process.env.CI;
const LOCAL_ONLY_ARGS = [
  '--watchAll',
  '--notify',
];
const CI_ONLY_ARGS = [
  '--coverage',
];

const args = [
  '--config', path.join('.', 'config', 'jest.config.js'),
  ...(IS_CI ? CI_ONLY_ARGS : LOCAL_ONLY_ARGS),
];

const out = spawnSync('jest', args, { stdio: 'inherit', shell: true });
if (out.status !== 0) {
  process.exit(out.status);
}
