import React from 'react';
import { connect } from 'react-redux';
import TabItem from './TabItem';
import { viewChange } from '../actions/view-change';
import View from '../domain/view';
import { AppState } from '../../application/reducer';
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
      name: 'maps',
      view: View.MAPS,
    },
  ];

  return (
    <TabsStripeContainer>
      {tabs.map(tab => (
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

export default connect(
  (state: AppState, ownProps: TabsStripeProps) => ({
    currentView: state.currentView,
    extended: ownProps.extended,
  }),
  dispatch => ({
    onTabChange: (nextView: View) => dispatch(viewChange(nextView)),
  }),
)(TabsStripe);
