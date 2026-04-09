import { generateCalendar } from "@/lib/dateUtils";
import DayCell from "./DayCell";

export default function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  onDaySelect,
  onDayHover,
  activeDate,
  notes,
}) {
  const days = generateCalendar(currentMonth);

  return (
    <div key={`grid-${currentMonth.toISOString()}`} className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/60 backdrop-blur-md p-3 shadow-2xl animate-page-flip">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-400 font-heading">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div key={dayName} className="py-2">
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <DayCell
            key={day.toString()}
            day={day}
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            activeDate={activeDate}
            notes={notes}
            onDayHover={onDayHover}
            onDaySelect={onDaySelect}
          />
        ))}
      </div>
    </div>
  );
}
