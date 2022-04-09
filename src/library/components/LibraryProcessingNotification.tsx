import React, { useEffect, useState } from 'react';
import { Notification } from '../../elements/Notification';
import { useAppContext } from '../../application/app-context';

interface LibraryProcessingNotificationProps {}

function LibraryProcessingNotification(): JSX.Element {
  const { libraryService } = useAppContext();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    libraryService.onScanningStarted(() => setVisible(true));
    libraryService.onScanningItemAdded((progress) => {
      const { current, total } = progress;
      setCurrentValue(current);
      setTotalValue(total);
    });
    libraryService.onScanningFinished(() => setVisible(false));
  }, [libraryService]);

  return (
    <Notification visible={visible} progressPercent={(currentValue / totalValue)}>
      Processing photos {currentValue}/{totalValue}
    </Notification>
  );
}

export { LibraryProcessingNotification, LibraryProcessingNotificationProps };
