import * as React from 'react';
import { useAppContext } from '../../application/app-context';
import { MediaItemsGroup, MediaItemGroupPosition } from '../media-items-group';
import FullscreenItemView from './FullscreenItemView';
import MediaItemGrid from './MediaItemGrid';
import useEventListener from '../../utils/use-event-listener';

interface LibraryViewProps {}

function LibraryView(): JSX.Element {
  const [itemGroups, setItemGroups] = React.useState<MediaItemsGroup[]>([]);
  const [fullscreenActive, setFullscreenActive] = React.useState<boolean>(false);
  const [fullscreenPosition, setFullscreenPosition] = React.useState<MediaItemGroupPosition>({ groupIndex: 0, itemIndex: 0 });

  const { libraryService } = useAppContext();

  React.useEffect(() => {
    const getItemsFromLibrary = async (): Promise<void> => {
      const items: MediaItemsGroup[] = await libraryService.getAllMediaItemsGrouped();
      setItemGroups(items);
    };

    libraryService.onScanningFinished(() => getItemsFromLibrary());

    // Kick off initial processing
    setTimeout(() => { // TODO: "Selected" photos should live in a global app state, not here - setTimeout is a hack to overcome this
      libraryService.startScanning();
    }, 1000);
    getItemsFromLibrary();
  }, [libraryService]);

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
