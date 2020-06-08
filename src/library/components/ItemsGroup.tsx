import * as React from 'react';
import styled from 'styled-components';
import { MediaItemsGroup } from '../media-items-group';
import ThumbnailCell from './ThumbnailCell';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
`;

interface ItemsGroupProps {
  group: MediaItemsGroup,
}
const ItemsGroup: React.FunctionComponent<ItemsGroupProps> = (props) => (
  <div>
    <h1>{props.group.title}</h1>
    <ItemsContainer>
      {props.group.items.map((mediaItem) => (
        <ThumbnailCell
          item={mediaItem}
          key={mediaItem.relativePath}
        />
      ))}
    </ItemsContainer>
  </div>
);

export default ItemsGroup;
export { ItemsGroupProps };
