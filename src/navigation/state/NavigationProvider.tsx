import React, { useReducer } from 'react';
import NavigationContext, { INITIAL_STATE } from './navigation-context';
import { navigationReducer } from './navigation-actions';

interface NavigationProviderProps { }
function NavigationProvider(props: NavigationProviderProps) : JSX.Element {
  const [currentView, dispatch] = useReducer(navigationReducer, INITIAL_STATE);

  return (
    <NavigationContext.Provider value={{ currentView, dispatch }} {...props} />
  );
}

export default NavigationProvider;
