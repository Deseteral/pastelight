import React from 'react';
import { ViewRouter, NavigationBar, NavigationProvider } from '../../navigation';

function App() {
  return (
    <NavigationProvider>
      <NavigationBar />
      <ViewRouter />
    </NavigationProvider>
  );
}

export default App;
