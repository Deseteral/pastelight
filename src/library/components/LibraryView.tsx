import * as React from 'react';
import { filter } from 'rxjs/operators';
import styled from 'styled-components';
import { useAppContext } from '../../application';
import * as Pastelogue from '../../pastelogue';
import { MediaItemsGroup } from '../media-items-group';
import ItemsGroup from './ItemsGroup';

const ContainerWrapper = styled.div`
  padding: 0 32px;
  overflow-y: scroll;
`;

const Container = styled.div``;

interface LibraryViewProps {}
const LibraryView: React.FunctionComponent<LibraryViewProps> = () => {
  const [itemGroups, setItemGroups] = React.useState<MediaItemsGroup[]>([]);
  const containerElement = React.useRef<HTMLDivElement>(null);
  const context = useAppContext();

  const getItemsFromLibrary = async () => {
    const items: MediaItemsGroup[] = await context.libraryService.getAllMediaItems();
    setItemGroups(items);
  };

  React.useEffect(() => {
    context.pastelogue.responses()
      .pipe(filter(Pastelogue.isProcessingFinishedResponse))
      .subscribe(() => getItemsFromLibrary());
    // TODO: This thing above is actually not really good - it's going to fetch items after pastelogue finishes
    //       processing - but that's too early. Instead it should do it after items are processed and added to library.
    //       This is not a big deal right now and this mechanism will probably change sooner than later so 🤷‍♀️.

    getItemsFromLibrary();
  }, []);

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
          <ItemsGroup group={group} key={group.title} />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default LibraryView;
export { LibraryViewProps };
