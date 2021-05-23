import * as React from 'react';
import styled from 'styled-components';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application/app-context';
import { toFullPath } from '../path-converter';

const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  transition: opacity .3s ease-in-out;
`;

const Image = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
`;

interface FullscreenItemViewProps {
  itemGroups: MediaItemsGroup[],
  visible: boolean,
  position: MediaItemGroupPosition,
}
const FullscreenItemView: React.FunctionComponent<FullscreenItemViewProps> = ({ itemGroups, visible, position }) => {
  const context = useAppContext();
  const currentItem: MediaItem = itemGroups[position.groupIndex]?.items[position.itemIndex];

  if (!currentItem) return null;

  return (
    <Container visible={visible}>
      <Image src={toFullPath(currentItem.relativePath, context.paths)} />
    </Container>
  );
};

export default FullscreenItemView;
export { FullscreenItemViewProps };
