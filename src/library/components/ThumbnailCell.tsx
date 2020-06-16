import * as React from 'react';
import styled from 'styled-components';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application';
import { relativeToThumbnailPath } from '../path-converter';

const Image = styled.img`
  width: var(--item-grid-size);
  height: var(--item-grid-size);
  padding: 2px;
  object-fit: cover;
`;

interface ThumbnailCellProps {
  item: MediaItem,
}
const ThumbnailCell: React.FunctionComponent<ThumbnailCellProps> = (props) => {
  const context = useAppContext();
  const path = relativeToThumbnailPath(props.item.relativePath, context.paths);
  return (
    <Image src={path} />
  );
};

export default ThumbnailCell;
export { ThumbnailCellProps };
