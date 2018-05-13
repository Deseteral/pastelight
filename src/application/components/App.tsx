import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from '../reducer';
import ViewRouter from '../../navigation/components/ViewRouter';
import NavigationBar from '../../navigation/components/NavigationBar';

interface AppProps {
  store: Store<AppState>;
}

function App(props: AppProps) : JSX.Element {
  return (
    <Provider store={props.store}>
      <div>
        <NavigationBar />
        <ViewRouter />
      </div>
    </Provider>
  );
}

export default App;
export {
  AppProps,
};
