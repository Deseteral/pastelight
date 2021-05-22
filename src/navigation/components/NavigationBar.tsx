import React from 'react';
import styled from 'styled-components';
import TabsStripe from './TabsStripe';
import View from '../domain/view';
import useNavigation from '../state/use-navigation';

interface PanelContainerProps {
  extended: boolean;
}

const PanelContainer = styled.div`
  z-index: 1000;
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ extended }: PanelContainerProps) => (extended ? '#263238' : 'transparent')};
  transition: background-color 0.3s ease;
`;

const Flex = styled.div`
  flex: 1;
`;

function NavigationBar() {
  const { currentView, changeView } = useNavigation();
  const extended = currentView !== View.MAP;

  return (
    <PanelContainer extended={extended}>
      <Flex />
      <TabsStripe extended={extended} currentView={currentView} onTabChange={changeView} />
    </PanelContainer>
  );
}

export default NavigationBar;
