import React from 'react';
import { connect } from 'react-redux';
import Views from '../domain/views';

function ViewRouter({ currentView }) {
  switch (currentView) {
    case Views.LIBRARY:
      return (<div>library view</div>);
    case Views.MAPS:
      return (<div>maps view</div>);
    default:
      return null;
  }
}

export default connect(state => ({
  currentView: state.currentView,
}))(ViewRouter);
