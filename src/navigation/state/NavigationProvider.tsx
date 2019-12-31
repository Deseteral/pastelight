import React, { useReducer } from 'react';
import NavigationContext, { INITIAL_STATE } from './navigation-context';
import { navigationReducer } from './navigation-actions';

interface NavigationProviderProps { }
function NavigationProvider(props: NavigationProviderProps) : JSX.Element {
  const [currentView, dispatch] = useReducer(navigationReducer, INITIAL_STATE);

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <NavigationContext.Provider value={{ currentView, dispatch }} {...props} />
  );
}

export default NavigationProvider;
