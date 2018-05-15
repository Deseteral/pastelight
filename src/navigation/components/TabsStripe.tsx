import * as React from 'react';
import { connect } from 'react-redux';
import TabsStripeContainer from './TabsStripeContainer';
import TabItem from './TabItem';
import { AppState } from '../../application/reducer';
import View from '../domain/view';
import { viewChange } from '../actions/view-change';

interface TabsStripeProps {
  extended: boolean;
  currentView: View;
  onTabChange: (nextView: View) => void;
}

function TabsStripe(props: TabsStripeProps) : JSX.Element {
  const { currentView, extended, onTabChange } = props;
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
  (dispatch) => ({
    onTabChange: (nextView: View) => dispatch(viewChange(nextView)),
  }),
)(TabsStripe);

export { TabsStripeProps };
