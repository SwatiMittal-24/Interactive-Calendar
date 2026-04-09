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
      <div className={`flex flex-col rounded-[2rem] border border-black/10 bg-white/40 backdrop-blur-md p-6 shadow-xl transition-all duration-500 hover:bg-white/60 hover:shadow-premium ${isSidePanel ? 'flex-1' : ''}`}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-light tracking-tight text-gray-900 font-heading">
            {format(currentMonth, "MMMM")} Memos
          </h3>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-500">
            Monthly
          </span>
        </div>
        <textarea
          value={monthMemo}
          onChange={(event) => updateMonthMemo(event.target.value)}
          placeholder="What are your goals for this month?"
          className="w-full flex-1 resize-none rounded-2xl bg-black/5 p-5 text-[0.9rem] leading-relaxed text-gray-700 outline-none transition focus:bg-white/80 focus:ring-1 focus:ring-white/50 placeholder:text-gray-400 font-sans"
        />
      </div>

      <div className={`flex flex-col rounded-[2rem] border border-black/10 bg-white/30 backdrop-blur-md p-6 shadow-xl transition-all duration-500 hover:bg-white/50 hover:shadow-premium ${isSidePanel ? 'flex-[1.5]' : ''}`}>
        <div className="mb-6 flex flex-col gap-3">
          <h3 className="text-xl font-light tracking-tight text-gray-900 font-heading leading-tight">
            {startDate ? getRangeLabel(startDate, endDate) : "Selection Insights"}
          </h3>
          <div className="flex gap-2">
            <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--accent)]">
              {rangeDays ? `${rangeDays} Day${rangeDays > 1 ? "s" : ""}` : "Planning..."}
            </span>
            {activeDate && (
              <span className="rounded-full bg-black/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gray-600">
                {format(activeDate, "MMM d")}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <textarea
            value={dayNote}
            onChange={(event) => updateDayNote(event.target.value)}
            placeholder={activeDate ? `Detailed notes for ${format(activeDate, "MMM d")}...` : "Select a day to begin..."}
            disabled={!activeDate}
            className="w-full flex-1 resize-none rounded-2xl bg-black/5 p-5 text-[0.9rem] leading-relaxed text-gray-700 outline-none transition disabled:opacity-30 focus:bg-white/80 focus:ring-1 focus:ring-white/50 placeholder:text-gray-400 font-sans"
          />
          <textarea
            value={selectionNote}
            onChange={(event) => updateSelectionNote(event.target.value)}
            placeholder={startDate ? `Strategic notes for this range...` : "Select a range to capture insights..."}
            disabled={!startDate}
            className="w-full h-32 resize-none rounded-2xl bg-black/5 p-5 text-[0.9rem] leading-relaxed text-gray-700 outline-none transition disabled:opacity-30 focus:bg-white/80 focus:ring-1 focus:ring-white/50 placeholder:text-gray-400 font-sans"
          />
        </div>
      </div>
    </section>
  );
}
