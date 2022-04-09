import path from 'path';

interface Log {
  datetime: Date,
  group: string,
  level: string,
  message: string,
}

class Logger {
  static info(message: string, group?: string): void {
    Logger.log('info', message, group);
  }

  static warn(message: string, group?: string): void {
    Logger.log('warn', message, group);
  }

  static error(message: string, group?: string): void {
    Logger.log('error', message, group);
  }

  private static printToConsole(l: Log): void {
    const color = (ck: string): string => {
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

  private static getFilenameOfCaller(): string {
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

  private static log(level: string, message: string, group?: string): void {
    const l: Log = {
      datetime: new Date(),
      group: group ?? Logger.getFilenameOfCaller(),
      level,
      message,
    };

    Logger.printToConsole(l);
  }
}

export { Logger };
