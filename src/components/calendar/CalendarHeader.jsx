import { addMonths, format } from "date-fns";

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
  clearSelection,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-subtle sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-6">
        <h2 key={`head-${currentMonth.toISOString()}`} className="text-2xl font-bold tracking-tight text-gray-900 font-heading animate-slide-up">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <div className="flex items-center overflow-hidden rounded-full border border-gray-100 bg-white">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="flex h-9 w-10 items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100"
            title="Previous Month"
          >
            ←
          </button>
          <div className="h-4 w-[1px] bg-gray-100" />
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="flex h-9 w-10 items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100"
            title="Next Month"
          >
            →
          </button>
        </div>
        
        <button
          onClick={() => setCurrentMonth(new Date())}
          className="rounded-full bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition hover:bg-gray-100"
        >
          Today
        </button>
        
        <button
          onClick={clearSelection}
          className="rounded-full bg-gray-900 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-800"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
