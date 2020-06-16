import * as React from 'react';
import styled from 'styled-components';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application';
import { toFullPath } from '../path-converter';

const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const Image = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
`;

interface FullscreenItemViewProps {
  itemGroups: MediaItemsGroup[],
  visible: boolean,
}
const FullscreenItemView: React.FunctionComponent<FullscreenItemViewProps> = ({ itemGroups, visible }) => {
  const context = useAppContext();
  const [position] = React.useState<MediaItemGroupPosition>({ groupIndex: 0, itemIndex: 0 });
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