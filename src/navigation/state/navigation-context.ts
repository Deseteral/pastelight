import React, { Dispatch } from 'react';
import { View } from '../domain/view';
import { NavigationAction } from './navigation-actions';

const INITIAL_STATE = View.LIBRARY;

interface NavigationContextT {
  currentView: View,
  dispatch: Dispatch<NavigationAction>,
}

const NavigationContext = React.createContext<NavigationContextT>({
  currentView: INITIAL_STATE,
  dispatch: (_: NavigationAction) => {},
});

export { INITIAL_STATE, NavigationContext };
