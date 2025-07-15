import {
  format,
  isToday,
  isYesterday,
  differenceInCalendarDays,
} from "date-fns";

/**
 * Safely formats a date input.
 * @returns:
 *  - humanReadable: e.g., "Today", "Yesterday", "2 weeks ago", or fallback
 *  - fullDate: e.g., "14/07/2025", or "—" if invalid
 */
export function formatDate(inputDate: string | Date | null | undefined) {
  if (!inputDate) {
    return {
      humanReadable: "—",
      fullDate: "—",
    };
  }

  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return {
      humanReadable: "Invalid Date",
      fullDate: "—",
    };
  }

  const fullDate = format(date, "dd/MM/yyyy");
  let humanReadable = fullDate;

  if (isToday(date)) {
    humanReadable = "Today";
  } else if (isYesterday(date)) {
    humanReadable = "Yesterday";
  } else {
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
