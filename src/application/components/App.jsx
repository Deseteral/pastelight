import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ViewRouter from '../../navigation/components/ViewRouter';
import NavigationBar from '../../navigation/components/NavigationBar';

function App({ store }) {
  return (
    <Provider store={store}>
      <Fragment>
        <NavigationBar />
        <ViewRouter />
      </Fragment>
    </Provider>
  );
}

export default App;
