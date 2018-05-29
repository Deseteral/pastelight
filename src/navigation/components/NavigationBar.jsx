import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabsStripe from './TabsStripe';
import Views from '../domain/views';

const PanelContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ extended, theme }) => (extended ? theme.colors.navigationBar : 'transparent')};
  transition: background-color 0.3s ease;
`;

function NavigationBar({ currentView }) {
  const extended = currentView !== Views.MAPS;

  return (
    <PanelContainer extended={extended}>
      <div style={({ flex: 1 })} />
      <TabsStripe extended={extended} />
    </PanelContainer>
  );
}

NavigationBar.propTypes = {
  currentView: PropTypes.string.isRequired,
};

export default connect(state => ({
  currentView: state.currentView,
}))(NavigationBar);
