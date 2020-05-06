import path from 'path';

interface Log {
  datetime: Date,
  group: string,
  level: string,
  message: string,
}

function printToConsole(l: Log) {
  const color = (ck: string) => {
    const c = (() => {
      switch (ck) {
        case 'date': return '#78909C';
        case 'group': return '#37474F';
        case 'info': return '#1565C0';
        case 'warn': return '#FFC107';
        case 'error': return '#B71C1C';
        default: return 'black';
      }
    })();

    return `color:${c};`;
  };

  const msg = [
    `[${l.datetime.toLocaleString()}] `,
    `[${l.group}] `,
    `${l.level.toUpperCase()}`,
    ': ',
    `${l.message}`,
  ].map((s) => `%c${s}`).join('');

  console.log( // eslint-disable-line no-console
    msg,
    color('date'),
    color('group'),
    color(l.level),
    color('default'),
    color('default'),
  );
}

function getFilenameOfCaller() : string {
  const originalPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_err, stack) => stack;
  const { stack } = new Error();
  Error.prepareStackTrace = originalPrepareStackTrace;

  // @ts-ignore This feature is non-standard but it works in electron
  const callers = stack.map((x) => x.getFileName());
  const firstExternalFilePath = callers.find((x: any) => x !== callers[0]);

  return firstExternalFilePath
    ? path.basename(firstExternalFilePath, path.extname(firstExternalFilePath))
    : 'anonymous';
}

function log(level: string, message: string, group?: string) {
  const l: Log = {
    datetime: new Date(),
    group: group ?? getFilenameOfCaller(),
    level,
    message,
  };

  printToConsole(l);
}

function info(message: string, group?: string) {
  log('info', message, group);
}

function warn(message: string, group?: string) {
  log('warn', message, group);
}

function error(message: string, group?: string) {
  log('warn', message, group);
}

export { info, warn, error };
