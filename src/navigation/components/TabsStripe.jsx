import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabsStripeContainer from './TabsStripeContainer';
import TabItem from './TabItem';
import Views from '../domain/views';
import { viewChange } from '../actions/view-change';

function TabsStripe({ currentView, extended, onTabChange }) {
  const tabs = [
    {
      name: 'library',
      view: Views.LIBRARY,
    }, {
      name: 'maps',
      view: Views.MAPS,
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

TabsStripe.propTypes = {
  currentView: PropTypes.string.isRequired,
  extended: PropTypes.bool,
  onTabChange: PropTypes.func.isRequired,
};

TabsStripe.defaultProps = {
  extended: false,
};

export default connect(
  (state, ownProps) => ({
    currentView: state.currentView,
    extended: ownProps.extended,
  }),
  dispatch => ({
    onTabChange: nextView => dispatch(viewChange(nextView)),
  }),
)(TabsStripe);
