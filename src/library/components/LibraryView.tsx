import * as React from 'react';
import { filter } from 'rxjs/operators';
import { useAppContext } from '../../application/app-context';
import * as Pastelogue from '../../pastelogue/model';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import FullscreenItemView from './FullscreenItemView';
import MediaItemGrid from './MediaItemGrid';
import useEventListener from '../../utils/use-event-listener';

interface LibraryViewProps {}

function LibraryView(): JSX.Element {
  const [itemGroups, setItemGroups] = React.useState<MediaItemsGroup[]>([]);
  const [fullscreenActive, setFullscreenActive] = React.useState<boolean>(false);
  const [fullscreenPosition, setFullscreenPosition] = React.useState<MediaItemGroupPosition>({ groupIndex: 0, itemIndex: 0 });

  const context = useAppContext();

  const getItemsFromLibrary = async (): Promise<void> => {
    const items: MediaItemsGroup[] = await context.libraryService.getAllMediaItemsGrouped();
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

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFullscreenActive(false);
  });

  const onItemClick = (selectedPosition: MediaItemGroupPosition): void => {
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
}

export default LibraryView;
export { LibraryViewProps };
