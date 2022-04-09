import React from 'react';
import { View } from '../domain/view';
import { viewChangeAction } from './navigation-actions';
import { NavigationContext } from './navigation-context';

type UseNavigationReturnType = ({ currentView: View, changeView: (view: View) => void });

function useNavigation(): UseNavigationReturnType {
  const context = React.useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');

  const { currentView, dispatch } = context;
  const changeView = (nextView: View): void => dispatch(viewChangeAction(nextView));

  return {
    currentView,
    changeView,
  };
}

export { useNavigation };
