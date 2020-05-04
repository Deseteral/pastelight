import * as React from 'react';
import styled from 'styled-components';
import { MediaItem } from '../library';
import { useAppContext } from '../../application';

const ImageThumbnail = styled.img`
  width: 200px;
`;

interface LibraryViewProps {}
const LibraryView: React.FunctionComponent<LibraryViewProps> = () => {
  const [mediaItems, setMediaItems] = React.useState<MediaItem[]>([]);
  const context = useAppContext();

  React.useEffect(() => {
    context.pastelogue.on('PROCESSING_FINISHED', async () => {
      const items = await context.library.getAllItems();
      setMediaItems(items);
    });

    (async () => {
      const items = await context.library.getAllItems();
      setMediaItems(items);
    })();
  }, []);

  return (
    <div>
      {mediaItems.map((mediaItem) => (
        <ImageThumbnail src={mediaItem.path} key={mediaItem.path} />
      ))}
    </div>
  );
};

export default LibraryView;
export { LibraryViewProps };
