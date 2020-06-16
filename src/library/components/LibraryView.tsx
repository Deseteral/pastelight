import * as React from 'react';
import { filter } from 'rxjs/operators';
import { useAppContext } from '../../application';
import * as Pastelogue from '../../pastelogue';
import { MediaItemsGroup } from '../media-items-group';
import FullscreenItemView from './FullscreenItemView';
import MediaItemGrid from './MediaItemGrid';

interface LibraryViewProps {}
const LibraryView: React.FunctionComponent<LibraryViewProps> = () => {
  const [itemGroups, setItemGroups] = React.useState<MediaItemsGroup[]>([]);
  const [fullscreenActive, setFullscreenActive] = React.useState<boolean>(false);

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

  return (
    <>
      <MediaItemGrid itemGroups={itemGroups} onItemSelect={() => setFullscreenActive(true)} />
      <FullscreenItemView itemGroups={itemGroups} visible={fullscreenActive} />
    </>
  );
};

export default LibraryView;
export { LibraryViewProps };
