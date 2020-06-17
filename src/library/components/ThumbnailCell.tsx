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
  onClick: () => void,
}
const ThumbnailCell: React.FunctionComponent<ThumbnailCellProps> = ({ item, onClick }) => {
  const context = useAppContext();
  const path = relativeToThumbnailPath(item.relativePath, context.paths);
  return (
    <Image src={path} onClick={onClick} />
  );
};

export default ThumbnailCell;
export { ThumbnailCellProps };
