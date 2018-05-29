import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
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

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
