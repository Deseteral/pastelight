import React, { useEffect, useState } from 'react';
import { Notification } from '../../elements';
import { useAppContext } from '../../application';

interface LibraryProcessingNotificationProps { }
const LibraryProcessingNotification: React.FunctionComponent<LibraryProcessingNotificationProps> = () => {
  const context = useAppContext();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    context.pastelogue.responses().subscribe(async (response) => {
      if (response.id === 'PROCESSING_STARTED') setVisible(true);
      if (response.id === 'PROCESSING_FINISHED') setVisible(false);
      if (response.id === 'PROCESSING_PROGRESS') {
        const { current, total } = response.payload.progress;
        setCurrentValue(current);
        setTotalValue(total);
      }
    });
  }, []);

  return (
    <Notification visible={visible} progressPercent={(currentValue / totalValue)}>
      Processing photos {currentValue}/{totalValue}
    </Notification>
  );
};

export default LibraryProcessingNotification;
export { LibraryProcessingNotificationProps };