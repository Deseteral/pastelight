import React from 'react';
import View from '../domain/view';
import useNavigation from '../state/use-navigation';
import { LibraryView } from '../../library';

function ViewRouter() {
  const { currentView } = useNavigation();

  switch (currentView) {
    case View.LIBRARY:
      return (<LibraryView />);
    case View.MAP:
      return (<div>map view</div>);
    default:
      return null;
  }
}

export default ViewRouter;
