import React from 'react';
import View from '../domain/view';
import Library from './Library';
import useNavigation from '../state/use-navigation';

function ViewRouter() {
  const { currentView } = useNavigation();

  switch (currentView) {
    case View.LIBRARY:
      return (<Library />);
    case View.MAPS:
      return (<div>maps view</div>);
    default:
      return null;
  }
}

export default ViewRouter;
