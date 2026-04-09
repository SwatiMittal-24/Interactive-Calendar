import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval
} from "date-fns";

export function generateCalendar(month) {
  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));
  return eachDayOfInterval({ start, end });
}

export function getDateKey(date) {
  return format(date, "yyyy-MM-dd");
}

export function getMonthKey(date) {
  return format(date, "yyyy-MM");
}

export function getSelectionKey(startDate, endDate) {
  if (!startDate) return null;

  const start = getDateKey(startDate);
  const end = getDateKey(endDate ?? startDate);

  return `${start}_${end}`;
}

export function getRangeLabel(startDate, endDate) {
  if (!startDate) return "No days selected";
  if (!endDate || isSameDay(startDate, endDate)) {
    return format(startDate, "MMM d, yyyy");
  }

  return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
}

export function isDayInSelection(day, startDate, endDate, hoverDate) {
  if (!startDate) return false;

  const selectionEnd = endDate ?? hoverDate;
  if (!selectionEnd) return isSameDay(day, startDate);

  const start = startDate < selectionEnd ? startDate : selectionEnd;
  const end = startDate < selectionEnd ? selectionEnd : startDate;

  return isWithinInterval(day, { start, end });
}
