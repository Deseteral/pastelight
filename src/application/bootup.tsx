import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
}

export { render };

// TODO: Logging
