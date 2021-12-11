import fromUnixTime from 'date-fns/fromUnixTime';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import format from 'date-fns/format';

function convertTimestampToString(timestamp) {
  const dateObj = fromUnixTime(timestamp);

  if (isToday(dateObj))
    return `Today at ${format(dateObj, "K':'m a")}`;

  if (isYesterday(dateObj))
    return `Yesterday at ${format(dateObj, "K':'m a")}`;

  return format(dateObj, "M'/'d'/'y");
}

export { convertTimestampToString };
