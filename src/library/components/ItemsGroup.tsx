import * as React from 'react';
import styled from 'styled-components';
import { MediaItemsGroup } from '../media-items-group';
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
  onItemSelect: () => void,
}
const ItemsGroup: React.FunctionComponent<ItemsGroupProps> = ({ group, onItemSelect }) => (
  <Container>
    <Text>{group.title}</Text>
    <ItemsContainer>
      {group.items.map((mediaItem) => (
        <ThumbnailCell
          item={mediaItem}
          onClick={onItemSelect}
          key={mediaItem.relativePath}
        />
      ))}
    </ItemsContainer>
  </Container>
);

export default ItemsGroup;
export { ItemsGroupProps };
