import React from 'react';
import styled from 'styled-components';
import TabsStripe from './TabsStripe';
import View from '../domain/view';
import useNavigation from '../state/use-navigation';

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

function NavigationBar() {
  const { currentView, changeView } = useNavigation();
  const extended = currentView !== View.MAPS;

  return (
    <PanelContainer extended={extended}>
      <div style={({ flex: 1 })} />
      <TabsStripe extended={extended} currentView={currentView} onTabChange={changeView} />
    </PanelContainer>
  );
}

export default NavigationBar;
