function toISOStringUTC(d: Date) : string {
  const yyyy = d.getUTCFullYear();
  const mm = (d.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd = d.getUTCDay().toString().padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const formattedTime = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
    .map((e) => e.toString())
    .map((s) => s.padStart(2, '0'))
    .join(':');

  return `${formattedDate}T${formattedTime}Z`;
}

function toISODateStringUTC(d: Date) : string {
  return toISOStringUTC(d).slice(0, 10);
}

function comparatorDescending(a: Date, b: Date) : (-1 | 0 | 1) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export {
  toISOStringUTC,
  toISODateStringUTC,
  comparatorDescending,
};
