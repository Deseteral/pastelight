import React from 'react';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import AppContextProvider from './AppContextProvider';

interface AppContainerProps {}
const AppContainer: React.FunctionComponent<AppContainerProps> = () => (
  <AppContextProvider>
    <NavigationProvider>
      <NavigationBar />
      <ViewRouter />
    </NavigationProvider>
  </AppContextProvider>
);

export default AppContainer;
export { AppContainerProps };
