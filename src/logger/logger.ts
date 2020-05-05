interface Log {
  datetime: Date,
  group: string,
  level: string,
  message: string,
}

const logs: Log[] = [];

function printToConsole(l: Log) {
  const s = `[${l.datetime.toLocaleString()}] [${l.group}] ${l.message}`;
  // @ts-ignore
  console[l.level](s); // eslint-disable-line no-console
}

function log(level: string, message: string, group = 'general') {
  const l: Log = {
    datetime: new Date(),
    group,
    level,
    message,
  };

  logs.push(l);
  printToConsole(l);
}

function info(message: string, group = 'general') {
  log('info', message, group);
}

function warn(message: string, group = 'general') {
  log('warn', message, group);
}

function error(message: string, group = 'general') {
  log('warn', message, group);
}

export { info, warn, error };
