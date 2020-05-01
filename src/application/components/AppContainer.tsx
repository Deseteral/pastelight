import React from 'react';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import AppContextProvider from './AppContextProvider';

function AppContainer() {
  return (
    <AppContextProvider>
      <NavigationProvider>
        <NavigationBar />
        <ViewRouter />
      </NavigationProvider>
    </AppContextProvider>
  );
}

export default AppContainer;
