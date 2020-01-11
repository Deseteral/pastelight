import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

const rootElement = document.getElementById('root');

function renderApp() {
  ReactDOM.render(<App />, rootElement);
}

export { renderApp };

// TODO: Logging
