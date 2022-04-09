import React from 'react';
import { View } from '../domain/view';
import { useNavigation } from '../state/use-navigation';
import { LibraryView } from '../../library/components/LibraryView';
import { MapView } from '../../map/components/MapView';

function ViewRouter(): JSX.Element {
  const { currentView } = useNavigation();

  switch (currentView) {
    case View.LIBRARY:
      return (<LibraryView />);
    case View.MAP:
      return (<MapView />);
    default:
      return null;
  }
}

export { ViewRouter };
