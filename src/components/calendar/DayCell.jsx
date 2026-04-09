import {
  format,
  isSameMonth,
  isWeekend,
  isToday
} from "date-fns";
import {
  getDateKey,
  isDayInSelection,
} from "@/lib/dateUtils";
import { getHoliday } from "@/lib/holidays";

export default function DayCell({
  day,
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  activeDate,
  notes,
  onDaySelect,
  onDayHover,
}) {
  const dateKey = getDateKey(day);
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isRangeDay = isDayInSelection(day, startDate, endDate, hoverDate);
  const isRangeStart = startDate && getDateKey(startDate) === dateKey;
  const isRangeEnd = endDate && getDateKey(endDate) === dateKey;
  const isSingleDaySelection = isRangeStart && isRangeEnd;
  const isNoteDay = Boolean(notes.days?.[dateKey]);
  const isMonthMemo = Boolean(notes.monthMemos?.[format(day, "yyyy-MM")]);
  const isActive = activeDate && getDateKey(activeDate) === dateKey;
  const weekend = isWeekend(day);
  const holiday = getHoliday(day);

  return (
    <button
      type="button"
      onClick={() => onDaySelect(day)}
      onMouseEnter={() => onDayHover(day)}
      onFocus={() => onDayHover(day)}
      className={[
        "group relative min-h-[70px] rounded-[1.2rem] border px-2 py-2 text-left transition-all duration-300 ease-out sm:min-h-[84px] lg:min-h-[72px] sm:px-3",
        isCurrentMonth
          ? "border-gray-50 bg-white"
          : "border-transparent bg-gray-50/50 text-gray-400",
        isRangeDay && !isRangeStart && !isRangeEnd
          ? "!bg-blue-100/90 !border-blue-200 !text-blue-900 z-0"
          : "",
        isRangeStart || isRangeEnd
          ? "!bg-gray-900 !border-gray-900 !text-white shadow-lg z-10 scale-[1.03]"
          : "",
        isToday(day) && !(isRangeDay)
          ? "border-blue-500 ring-1 ring-blue-100 bg-blue-50/30"
          : "",
        isActive && !(isRangeDay) && !(isRangeStart || isRangeEnd)
          ? "border-gray-200 bg-gray-50 shadow-sm"
          : "",
        "hover:border-gray-300 hover:shadow-subtle hover:z-20",
        "focus:outline-none focus:ring-1 focus:ring-gray-300",
      ].join(" ")}
    >
      <div className="relative z-10 flex items-start justify-between">
        <span
          className={[
            "text-sm font-bold sm:text-base",
            weekend && isCurrentMonth && !(isRangeDay) && !(isRangeStart || isRangeEnd)
              ? "text-red-500"
              : "",
            (isRangeStart || isRangeEnd) ? "!text-white" : "",
            (isRangeDay && !isRangeStart && !isRangeEnd) ? "!text-blue-900" : "",
          ].join(" ")}
        >
          {format(day, "d")}
        </span>

        {(isNoteDay || holiday) && (
          <div className="flex flex-col items-end gap-1">
            {holiday && (
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-sm" title={holiday} />
            )}
            {isNoteDay && (
              <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[0.5rem] font-bold uppercase tracking-tight text-blue-700">
                Note
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-3 flex items-end justify-between text-[0.55rem] font-bold uppercase tracking-widest opacity-40">
        <span>{isToday(day) ? "Today" : ""}</span>
        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {holiday ? "Holiday" : ""}
        </span>
      </div>
    </button>
  );
}
