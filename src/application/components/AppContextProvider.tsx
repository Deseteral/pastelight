import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { AppContext, getAppContext, initializeAppContext } from '../app-context';
import { IPC_LOAD_CATALOGUE_CHANNEL, IpcLoadCatalogueData } from '../../welcome-screen';

const Context = React.createContext<(AppContext|null)>(getAppContext());

interface AppContextProviderProps { }
function AppContextProvider(props: AppContextProviderProps) : JSX.Element {
  useEffect(() => {
    ipcRenderer.on(IPC_LOAD_CATALOGUE_CHANNEL, (_, data: IpcLoadCatalogueData) => {
      initializeAppContext(data.path);
    });
  }, []);

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Context.Provider value={getAppContext()} {...props} />
  );
}

export default AppContextProvider;
export { Context };
