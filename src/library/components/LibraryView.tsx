import * as React from 'react';
import styled from 'styled-components';
import { MediaItem } from '../library';
import * as Application from '../../application';

const ImageThumbnail = styled.img`
  width: 200px;
`;

interface LibraryViewProps { }
function LibraryView(_: LibraryViewProps) : JSX.Element {
  const [mediaItems, setMediaItems] = React.useState<MediaItem[]>([]);
  const context = React.useContext(Application.Context);

  React.useEffect(() => {
    // TODO: If context changes this may be called more than once which is not good
    if (!context) return;
    context.pastelogue.on('PROCESSING_FINISHED', async () => {
      const items = await context.library.getAllItems();
      setMediaItems(items);
    });

    (async () => {
      const items = await context.library.getAllItems();
      setMediaItems(items);
    })();
  }, [context]);

  return (
    <div>
      {mediaItems.map((mediaItem) => (
        <ImageThumbnail src={mediaItem.path} key={mediaItem.path} />
      ))}
    </div>
  );
}

export default LibraryView;
