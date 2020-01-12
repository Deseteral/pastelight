import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements';
import { RecentLocation } from '../model';

const OrderedList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListElement = styled.li`
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Clickable = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
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

const RecentList: React.FunctionComponent<RecentListProps> = ({ list, onSelect }) => (
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

export default RecentList;
export { RecentListProps };
