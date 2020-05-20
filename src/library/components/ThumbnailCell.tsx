import * as React from 'react';
import styled from 'styled-components';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application';
import { relativeToThumbnailPath } from '../path-converter';

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 235px;
  height: 180px;
`;

const Image = styled.img`
`;

interface ThumbnailCellProps {
  item: MediaItem,
}

const ThumbnailCell: React.FunctionComponent<ThumbnailCellProps> = (props) => {
  const context = useAppContext();
  const path = relativeToThumbnailPath(props.item.relativePath, context.paths);
  return (
    <Container>
      <Image src={path} />
    </Container>
  );
};

export default ThumbnailCell;
export { ThumbnailCellProps };
