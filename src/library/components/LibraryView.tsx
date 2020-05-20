import * as React from 'react';
import styled from 'styled-components';
import { filter } from 'rxjs/operators';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application';
import * as Pastelogue from '../../pastelogue';
import ThumbnailCell from './ThumbnailCell';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
`;

interface LibraryViewProps {}
const LibraryView: React.FunctionComponent<LibraryViewProps> = () => {
  const [mediaItems, setMediaItems] = React.useState<MediaItem[]>([]);
  const context = useAppContext();

  const getItemsFromLibrary = async () => {
    const items = await context.library.getAllItems();
    setMediaItems(items);
  };

  React.useEffect(() => {
    context.pastelogue.responses()
      .pipe(filter(Pastelogue.isProcessingFinishedResponse))
      .subscribe(() => getItemsFromLibrary());

    getItemsFromLibrary();
  }, []);

  return (
    <Container>
      {mediaItems.map((mediaItem) => (
        <ThumbnailCell
          item={mediaItem}
          key={mediaItem.relativePath}
        />
      ))}
    </Container>
  );
};

export default LibraryView;
export { LibraryViewProps };
