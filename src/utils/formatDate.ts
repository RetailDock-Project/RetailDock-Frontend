// src/utils/formatDate.ts
import {
  format,
  isToday,
  isYesterday,
  differenceInCalendarDays,
} from "date-fns";

/**
 * Returns both:
 * - humanReadable: "Today", "Yesterday", "2 weeks ago", etc.
 * - fullDate: always in "dd/MM/yyyy" format
 */
export function formatDate(inputDate: string | Date) {
  const date = new Date(inputDate);
  const fullDate = format(date, "dd/MM/yyyy");
  let humanReadable = fullDate;

  if (isToday(date)) humanReadable = "Today";
  else if (isYesterday(date)) humanReadable = "Yesterday";
  else {
    const daysAgo = differenceInCalendarDays(new Date(), date);
    if (daysAgo <= 6) humanReadable = `${daysAgo} days ago`;
    else if (daysAgo <= 13) humanReadable = "Last week";
    else if (daysAgo <= 20) humanReadable = "2 weeks ago";
    else if (daysAgo <= 27) humanReadable = "3 weeks ago";
  }

  return {
    humanReadable,
    fullDate,
  };
}
