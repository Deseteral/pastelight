import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';
import AppContextProvider from './AppContextProvider';
import { LibraryProcessingNotification } from '../../library';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`;

interface AppContainerProps {}

function AppContainer(): JSX.Element {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <AppContextProvider>
        <NavigationProvider>
          <ContentContainer>
            <NavigationBar />
            <ViewRouter />
          </ContentContainer>
        </NavigationProvider>
        <LibraryProcessingNotification />
      </AppContextProvider>
    </StyleSheetManager>
  );
}

export default AppContainer;
export { AppContainerProps };
