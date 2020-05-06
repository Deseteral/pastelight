import React from 'react';
import styled from 'styled-components';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import AppContextProvider from './AppContextProvider';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`;

interface AppContainerProps {}
const AppContainer: React.FunctionComponent<AppContainerProps> = () => (
  <AppContextProvider>
    <NavigationProvider>
      <ContentContainer>
        <NavigationBar />
        <ViewRouter />
      </ContentContainer>
    </NavigationProvider>
  </AppContextProvider>
);

export default AppContainer;
export { AppContainerProps };
