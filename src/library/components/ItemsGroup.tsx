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
}
const ItemsGroup: React.FunctionComponent<ItemsGroupProps> = (props) => (
  <Container>
    <Text>{props.group.title}</Text>
    <ItemsContainer>
      {props.group.items.map((mediaItem) => (
        <ThumbnailCell
          item={mediaItem}
          key={mediaItem.relativePath}
        />
      ))}
    </ItemsContainer>
  </Container>
);

export default ItemsGroup;
export { ItemsGroupProps };
