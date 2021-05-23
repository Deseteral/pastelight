import * as React from 'react';
import styled from 'styled-components';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import ThumbnailCell from './ThumbnailCell';
import { Text } from '../../elements';

const Container = styled.div`
  margin-bottom: 16px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface ItemsGroupProps {
  group: MediaItemsGroup,
  groupIndex: number,
  onItemClick: (selectedPosition: MediaItemGroupPosition) => void,
}

function ItemsGroup({ group, groupIndex, onItemClick }: ItemsGroupProps): JSX.Element {
  return (
    <Container>
      <Text>{group.title}</Text>
      <ItemsContainer>
        {group.items.map((mediaItem, idx) => (
          <ThumbnailCell
            item={mediaItem}
            onClick={() => onItemClick({ groupIndex, itemIndex: idx })}
            key={mediaItem.relativePath}
          />
        ))}
      </ItemsContainer>
    </Container>
  );
}

export default ItemsGroup;
export { ItemsGroupProps };
