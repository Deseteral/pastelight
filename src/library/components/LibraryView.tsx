import * as React from 'react';
import styled from 'styled-components';
import { filter } from 'rxjs/operators';
import { MediaItem } from '../media-item';
import { useAppContext } from '../../application';
import * as Pastelogue from '../../pastelogue';

const Container = styled.div`
  overflow-y: scroll;
`;

const ImageThumbnail = styled.img`
  width: 200px;
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
        <ImageThumbnail src={mediaItem.path} key={mediaItem.path} />
      ))}
    </Container>
  );
};

export default LibraryView;
export { LibraryViewProps };
