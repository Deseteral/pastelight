import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

// TODO: Extract ⬇️this function into service
const formatPercentage = (percent: number): string => `${((percent * 100) | 0)}%`; // eslint-disable-line no-bitwise

const NotificationContainer = styled.div<NotificationProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  bottom: 16px;
  left: 16px;
  height: 48px;
  padding: 0 16px;
  background: grey;
  border-radius: 4px;
  background: #323232;
  color: var(--color-text-primary);
  box-shadow: 0 5px 15px rgba(0,0,0,.05), 0 4px 10px #000000;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity .3s ease-in-out;
`;

const ProgressBar = styled.div<{progressPercent: number}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${(props) => formatPercentage(props.progressPercent)};
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: var(--color-primary);
`;

interface NotificationProps {
  progressPercent?: number,
  visible: boolean,
  children: React.ReactNode
}

function Notification(props: NotificationProps): JSX.Element {
  const [actualVisible, setActualVisible] = useState<boolean>(props.visible);
  const visibilityTimeout = React.useRef<(number | null)>(null);

  useEffect(() => {
    if (visibilityTimeout.current) {
      clearTimeout(visibilityTimeout.current);
      visibilityTimeout.current = null;
    }

    if (props.visible) {
      setActualVisible(true);
    } else {
      visibilityTimeout.current = window.setTimeout(() => setActualVisible(false), 4000);
    }
  }, [props.visible]);

  return (
    <NotificationContainer visible={actualVisible}>
      {props.children}
      <ProgressBar progressPercent={props.progressPercent} />
    </NotificationContainer>
  );
}

Notification.defaultProps = {
  progressPercent: 0,
};

export default Notification;
export { NotificationProps };
