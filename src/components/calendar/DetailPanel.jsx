import { differenceInCalendarDays, format } from "date-fns";
import {
  getDateKey,
  getMonthKey,
  getRangeLabel,
  getSelectionKey,
} from "@/lib/dateUtils";

export default function DetailPanel({
  currentMonth,
  startDate,
  endDate,
  activeDate,
  notes,
  setNotes,
  isSidePanel = false,
  wrapperClassName = "",
}) {
  const monthKey = getMonthKey(currentMonth);
  const monthMemo = notes.monthMemos?.[monthKey] ?? "";
  const dayNoteKey = activeDate ? getDateKey(activeDate) : null;
  const selectionKey = startDate ? getSelectionKey(startDate, endDate) : null;
  const dayNote = dayNoteKey ? notes.days?.[dayNoteKey] ?? "" : "";
  const selectionNote = selectionKey ? notes.selections?.[selectionKey] ?? "" : "";
  const rangeDays =
    startDate && endDate
      ? differenceInCalendarDays(endDate, startDate) + 1
      : startDate
        ? 1
        : 0;

  const updateMonthMemo = (value) => {
    setNotes((current) => ({
      ...current,
      monthMemos: {
        ...current.monthMemos,
        [monthKey]: value,
      },
    }));
  };

  const updateDayNote = (value) => {
    if (!dayNoteKey) return;

    setNotes((current) => ({
      ...current,
      days: {
        ...current.days,
        [dayNoteKey]: value,
      },
    }));
  };

  const updateSelectionNote = (value) => {
    if (!selectionKey) return;

    setNotes((current) => ({
      ...current,
      selections: {
        ...current.selections,
        [selectionKey]: value,
      },
    }));
  };

  const gridClass = isSidePanel 
    ? "flex flex-col gap-4 h-full" 
    : "grid gap-6 xl:grid-cols-[1fr_1fr] mt-2";

  return (
    <section className={gridClass + " " + wrapperClassName}>
      <div className={`flex flex-col rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-subtle transition-all duration-300 hover:shadow-premium ${isSidePanel ? 'flex-1' : ''}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight text-gray-900 font-heading">
            {format(currentMonth, "MMMM")} Memos
          </h3>
          <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-gray-400">
            Pinned
          </span>
        </div>
        <textarea
          value={monthMemo}
          onChange={(event) => updateMonthMemo(event.target.value)}
          placeholder="Monthly goals..."
          className="w-full flex-1 resize-none rounded-xl bg-gray-50/50 p-4 text-[0.85rem] leading-relaxed text-gray-700 outline-none transition focus:bg-white focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400"
        />
      </div>

      <div className={`flex flex-col rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-subtle transition-all duration-300 hover:shadow-premium ${isSidePanel ? 'flex-[1.5]' : ''}`}>
        <div className="mb-4 flex flex-col gap-2">
          <h3 className="text-lg font-bold tracking-tight text-gray-900 font-heading">
            {startDate ? getRangeLabel(startDate, endDate) : "Selection Details"}
          </h3>
          <div className="flex gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-blue-600">
              {rangeDays ? `${rangeDays} Day${rangeDays > 1 ? "s" : ""}` : "0 Days"}
            </span>
            {activeDate && (
              <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-purple-600">
                {format(activeDate, "MMM d")}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <textarea
            value={dayNote}
            onChange={(event) => updateDayNote(event.target.value)}
            placeholder={activeDate ? `Notes for ${format(activeDate, "MMM d")}...` : "Select a day..."}
            disabled={!activeDate}
            className="w-full flex-1 resize-none rounded-xl bg-gray-50/50 p-4 text-[0.85rem] leading-relaxed text-gray-700 outline-none transition disabled:opacity-40 focus:bg-white focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400"
          />
          <textarea
            value={selectionNote}
            onChange={(event) => updateSelectionNote(event.target.value)}
            placeholder={startDate ? `Range notes...` : "Select range..."}
            disabled={!startDate}
            className="w-full flex-1 resize-none rounded-xl bg-gray-50/50 p-4 text-[0.85rem] leading-relaxed text-gray-700 outline-none transition disabled:opacity-40 focus:bg-white focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400"
          />
        </div>
      </div>
    </section>
  );
}
