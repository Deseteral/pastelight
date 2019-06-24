import React from 'react';
import { connect } from 'react-redux';
import View from '../domain/view';
import { AppState } from '../../application';

interface ViewRouterProps {
  currentView: View;
}

function ViewRouter({ currentView }: ViewRouterProps) {
  switch (currentView) {
    case View.LIBRARY:
      return (<div>library view</div>);
    case View.MAPS:
      return (<div>maps view</div>);
    default:
      return null;
  }
}

export default connect((state: AppState) => ({
  currentView: state.currentView,
}))(ViewRouter);
