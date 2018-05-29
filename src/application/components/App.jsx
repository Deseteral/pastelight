import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ViewRouter from '../../navigation/components/ViewRouter';
import NavigationBar from '../../navigation/components/NavigationBar';
import theme from '../theme';

function App({ store }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <NavigationBar />
          <ViewRouter />
        </Fragment>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
