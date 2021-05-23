import { useRef, useEffect } from 'react';

const DEFAULT_HANDLER = (): void => {};

type EventMap = (HTMLElementEventMap & DocumentEventMap & WindowEventMap);

function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element: (HTMLElement | Document | Window) = window,
): void {
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
