import React, { useEffect, useState, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { AppContext, createAppContext } from '../app-context';
import { IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData } from '../../welcome-screen';
import Logger from '../logger';

const Context = React.createContext<AppContext|null>(null);

interface AppContextProviderProps {}

function AppContextProvider(props: AppContextProviderProps): JSX.Element {
  const [context, setContext] = useState<AppContext|null>(null);

  useEffect(() => {
    ipcRenderer.on(IPC_LOAD_CATALOGUE_CHANNEL, async (_, data: IpcLoadCatalogueData) => {
      Logger.info(`Received library path from main process: "${data.path}"`);

      const appContext = await createAppContext(data.path);
      setContext(appContext);
    });
  }, []);

  return context
    ? <Context.Provider value={context} {...props} /> // eslint-disable-line react/jsx-props-no-spreading, max-len
    : null;
}

function useAppContext() : AppContext {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Cannot use AppContext before it's initialization");
  }
  return context;
}

export default AppContextProvider;
export { AppContextProviderProps, useAppContext };
