import { useRef, useEffect } from 'react';

const DEFAULT_HANDLER = () => {};

type EventMap = (HTMLElementEventMap & DocumentEventMap & WindowEventMap);

function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element: (HTMLElement | Document | Window) = window,
) {
  const savedHandler = useRef<(event: EventMap[K]) => void>(DEFAULT_HANDLER);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // TODO: Fix typings
    // @ts-ignore
    const eventListener: EventListener = (event: EventMap[K]) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

export { useEventListener };
