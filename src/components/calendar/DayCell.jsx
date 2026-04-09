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
          ? "border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/40"
          : "border-transparent text-gray-400/50 opacity-40",
        isRangeDay && !isRangeStart && !isRangeEnd
          ? "!bg-[var(--accent)]/15 !border-[var(--accent)]/20 !text-[var(--ink)] z-0"
          : "",
        isRangeStart || isRangeEnd
          ? "!bg-gray-900 !border-gray-900 !text-white shadow-2xl z-10 scale-[1.05]"
          : "",
        isToday(day) && !(isRangeDay)
          ? "ring-2 ring-white/60 bg-white/40 shadow-xl"
          : "",
        isActive && !(isRangeDay) && !(isRangeStart || isRangeEnd)
          ? "border-white/60 bg-white/50 shadow-md"
          : "",
        "hover:shadow-premium hover:z-20",
        "focus:outline-none focus:ring-2 focus:ring-white/50",
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
