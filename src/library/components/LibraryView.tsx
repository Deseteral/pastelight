import * as React from 'react';
import { filter } from 'rxjs/operators';
import { useAppContext } from '../../application';
import * as Pastelogue from '../../pastelogue';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import FullscreenItemView from './FullscreenItemView';
import MediaItemGrid from './MediaItemGrid';

interface LibraryViewProps {}
const LibraryView: React.FunctionComponent<LibraryViewProps> = () => {
  const [itemGroups, setItemGroups] = React.useState<MediaItemsGroup[]>([]);
  const [fullscreenActive, setFullscreenActive] = React.useState<boolean>(false);
  const [fullscreenPosition, setFullscreenPosition] = React.useState<MediaItemGroupPosition>({ groupIndex: 0, itemIndex: 0 });

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

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenActive(false);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const onItemClick = (selectedPosition: MediaItemGroupPosition) => {
    setFullscreenPosition(selectedPosition);
    setFullscreenActive(true);
  };

  return (
    <>
      <MediaItemGrid
        itemGroups={itemGroups}
        onItemClick={onItemClick}
      />
      <FullscreenItemView
        visible={fullscreenActive}
        position={fullscreenPosition}
        itemGroups={itemGroups}
      />
    </>
  );
};

export default LibraryView;
export { LibraryViewProps };
