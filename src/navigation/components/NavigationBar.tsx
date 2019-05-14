import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TabsStripe from './TabsStripe';
import View from '../domain/view';
import { AppState } from '../../application/reducer';

interface PanelContainerProps {
  extended: boolean;
}

const PanelContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ extended }: PanelContainerProps) => (extended ? 'var(--color-navigationBar)' : 'transparent')};
  transition: background-color 0.3s ease;
`;

interface NavigationBarProps {
  currentView: View;
}

function NavigationBar({ currentView }: NavigationBarProps) {
  const extended = currentView !== View.MAPS;

  return (
    <PanelContainer extended={extended}>
      <div style={({ flex: 1 })} />
      <TabsStripe extended={extended} />
    </PanelContainer>
  );
}

export default connect((state: AppState) => ({
  currentView: state.currentView,
}))(NavigationBar);
