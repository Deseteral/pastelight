import React from 'react';
import TabItem from './TabItem';
import View from '../domain/view';
import TabsStripeContainer from './TabsStripeContainer';

interface TabsStripeProps {
  extended: boolean;
  currentView: View;
  onTabChange: (nextView: View) => void;
}

function TabsStripe({ currentView, extended = false, onTabChange }: TabsStripeProps) {
  const tabs = [
    {
      name: 'library',
      view: View.LIBRARY,
    }, {
      name: 'map',
      view: View.MAP,
    },
  ];

  return (
    <TabsStripeContainer>
      {tabs.map((tab) => (
        <TabItem
          key={tab.name}
          onClick={() => onTabChange(tab.view)}
          active={currentView === tab.view}
          shouldHide={!extended}
        >
          {tab.name}
        </TabItem>
      ))}
    </TabsStripeContainer>
  );
}

export default TabsStripe;
