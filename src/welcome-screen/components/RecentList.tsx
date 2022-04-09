import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements/Text';
import { RecentLocation } from '../services/recent-location-list';

const EmptyListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const OrderedList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow-y: overlay;
`;

const ListElement = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Clickable = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px;
  padding-left: 16px;
  text-align: left;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color .3s ease-in-out;

  &:hover {
    background-color: var(--color-primary-light);
  }

  &:focus {
    background-color: var(--color-primary);

    & > ${Text} {
      color: var(--color-text-primary);
    }
  }
`;

const PathText = styled(Text)`
  margin-top: 2px;
  overflow: hidden;
`;

interface RecentListProps {
  list: RecentLocation[];
  onSelect: (selected: RecentLocation) => void;
}

function RecentList({ list, onSelect }: RecentListProps): JSX.Element {
  if (list.length === 0) {
    return (
      <EmptyListContainer>
        <Text secondary>There are no recent photo catalogues</Text>
      </EmptyListContainer>
    );
  }

  return (
    <OrderedList>
      {list.map((recentLocation) => (
        <ListElement key={recentLocation.path}>
          <Clickable onClick={() => onSelect(recentLocation)}>
            <Text>{recentLocation.title}</Text>
            <PathText secondary>{recentLocation.path}</PathText>
          </Clickable>
        </ListElement>
      ))}
    </OrderedList>
  );
}

export { RecentList, RecentListProps };
