import React, { useReducer } from 'react';
import { NavigationContext, INITIAL_STATE } from './navigation-context';
import { navigationReducer } from './navigation-actions';

interface NavigationProviderProps { }
function NavigationProvider(props: NavigationProviderProps): JSX.Element {
  const [currentView, dispatch] = useReducer(navigationReducer, INITIAL_STATE);
  const value = React.useMemo(() => ({ currentView, dispatch }), [currentView]);

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <NavigationContext.Provider value={value} {...props} />
  );
}

export { NavigationProvider };
