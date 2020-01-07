function isDevMode() {
  return !!process.execPath.match(/[\\/]electron/);
}

export default isDevMode;
