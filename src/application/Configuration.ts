interface Configuration {
  isDevMode: boolean;
}

function getAppConfig() : Configuration {
  return {
    isDevMode: !!process.execPath.match(/[\\/]electron/),
  };
}

export default Configuration;
export {
  getAppConfig,
};
