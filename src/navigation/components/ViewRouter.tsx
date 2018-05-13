import * as React from 'react';
import { connect } from 'react-redux';
import View from '../domain/view';
import { AppState } from '../../application/reducer';

interface ViewRouterProps {
  currentView: View;
}

function ViewRouter(props: ViewRouterProps) : (JSX.Element | null) {
  switch (props.currentView) {
    case View.LIBRARY_VIEW:
      return (<div>library view</div>);
    default:
      return null;
  }
}

export default connect((state: AppState) => {
  return {
    currentView: state.currentView,
  };
})(ViewRouter);

export {
  ViewRouterProps,
};
