import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from '../reducer';

interface AppProps {
  store: Store<AppState>;
}

function App(props: AppProps) : JSX.Element {
  return (
    <Provider store={props.store}>
      <h1>pastelight</h1>
    </Provider>
  );
}

export default App;
export {
  AppProps,
};
