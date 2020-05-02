import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { AppContext, getAppContext, initializeAppContext } from '../app-context';
import { IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData } from '../../welcome-screen';

const Context = React.createContext<(AppContext|null)>(null);

interface AppContextProviderProps { }
function AppContextProvider(props: AppContextProviderProps) : JSX.Element {
  const [context, setContext] = useState(getAppContext());

  useEffect(() => {
    ipcRenderer.on(IPC_LOAD_CATALOGUE_CHANNEL, async (_, data: IpcLoadCatalogueData) => {
      await initializeAppContext(data.path);
      setContext(getAppContext());
    });
  }, []);

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Context.Provider value={context} {...props} />
  );
}

export default AppContextProvider;
export { Context };
