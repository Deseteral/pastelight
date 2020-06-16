import * as React from 'react';
import styled from 'styled-components';
import ItemsGroup from './ItemsGroup';
import { MediaItemsGroup } from '../media-items-group';

const ContainerWrapper = styled.div`
  padding: 0 32px;
  overflow-y: scroll;
`;

const Container = styled.div``;

interface MediaItemGridProps {
  itemGroups: MediaItemsGroup[],
  onItemSelect: () => void,
}
const MediaItemGrid: React.FunctionComponent<MediaItemGridProps> = ({ itemGroups, onItemSelect }) => {
  const containerElement = React.useRef<HTMLDivElement>(null);

  const onResize = () => {
    if (!containerElement.current) return;
    const ITEMS_IN_ROW = 5;
    const nextGridSize = Math.floor(containerElement.current.clientWidth / ITEMS_IN_ROW);
    const root = document.documentElement;
    root.style.setProperty('--item-grid-size', `${nextGridSize}px`);
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  React.useEffect(() => { onResize(); }); // TODO: This might be slow, check

  return (
    <ContainerWrapper>
      <Container ref={containerElement}>
        {itemGroups.map((group) => (
          <ItemsGroup group={group} onItemSelect={onItemSelect} key={group.title} />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default MediaItemGrid;
export { MediaItemGridProps };
