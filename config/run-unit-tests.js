const { spawnSync } = require('child_process');

const isCI = !!process.env.CI;

const localOnlyArgs = [
  '--watchAll',
  '--notify',
];

const args = [
  '--config', './config/jest.config.js',
  ...(isCI ? [] : localOnlyArgs),
];

const options = {
  stdio: 'inherit',
};

const out = spawnSync('jest', args, options);

if (out.status !== 0) {
  process.exit(out.status);
}
