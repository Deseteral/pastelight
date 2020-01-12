import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements';
import { RecentLocation } from '../model';

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

  &:focus {
    background-color: var(--color-primary);

    & > ${Text} {
      color: var(--color-text-primary);
    }
  }
`;

interface RecentListProps {
  list: RecentLocation[];
  onSelect: (selected: RecentLocation) => void;
}

const RecentList: React.FunctionComponent<RecentListProps> = ({ list, onSelect }) => {
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
            <Text>{recentLocation.path}</Text>
            <Text secondary>Number of items: {recentLocation.elementsCount}</Text>
          </Clickable>
        </ListElement>
      ))}
    </OrderedList>
  );
};

export default RecentList;
export { RecentListProps };
