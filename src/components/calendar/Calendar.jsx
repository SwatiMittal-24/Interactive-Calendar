"use client";

import { useEffect, useState } from "react";
import {
  eachWeekendOfMonth,
  endOfMonth,
  format,
  isAfter,
  isSameDay,
  startOfMonth,
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import DetailPanel from "./DetailPanel";
import { getDateKey } from "@/lib/dateUtils";
import { getMonthTheme } from "@/lib/monthThemes";
import { monthImages } from "@/lib/monthImages";

const STORAGE_KEY = "wall-calendar-planner";

const defaultNotes = {
  monthMemos: {},
  days: {},
  selections: {},
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [notes, setNotes] = useState(defaultNotes);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setNotes({ ...defaultNotes, ...JSON.parse(saved) });
      } catch {
        setNotes(defaultNotes);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [isReady, notes]);

  const handleDaySelect = (day) => {
    setActiveDate(day);
    setHoverDate(day);

    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (isSameDay(day, startDate)) {
      setEndDate(day);
      return;
    }

    if (isAfter(day, startDate)) {
      setEndDate(day);
      return;
    }

    setStartDate(day);
    setEndDate(null);
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setActiveDate(null);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const weekendCount = eachWeekendOfMonth(currentMonth).length;
  const theme = getMonthTheme(currentMonth);
  const monthNoteCount = Object.keys(notes.days ?? {}).filter((key) => {
    return key >= getDateKey(monthStart) && key <= getDateKey(monthEnd);
  }).length;

  return (
    <div className="mx-auto max-w-[1600px] lg:h-screen lg:overflow-hidden lg:flex lg:flex-col lg:p-4">
      <div
        className="relative flex-1 overflow-auto rounded-[2.5rem] border p-4 shadow-premium sm:p-6 lg:overflow-hidden lg:flex lg:flex-col transition-colors duration-500"
        style={{
          "--paper": theme.paper,
          "--paper-strong": theme.paperStrong,
          "--ink": theme.ink,
          "--accent": theme.accent,
          "--accent-soft": theme.accentSoft,
          "--accent-muted": theme.accentMuted,
          "--forest": theme.forest,
          "--gold": theme.gold,
          "--shell": theme.shell,
          "--shell-border": theme.shellBorder,
          "--ring": theme.ring,
          "--ring-shadow": theme.ringShadow,
          backgroundColor: theme.accentMuted + "80", // 50% opacity
          borderColor: "rgba(0,0,0,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 hidden h-12 items-start justify-center gap-12 xl:flex z-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative h-14 w-8">
              {/* The metal ring */}
              <div
                className="absolute left-1/2 top-[-10px] h-16 w-full -translate-x-1/2 rounded-full border-[4px] shadow-lg"
                style={{ 
                  borderColor: "#d1d5db",
                  background: "linear-gradient(to right, #9ca3af, #f3f4f6, #9ca3af)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
              />
              {/* The shadow cast by the ring on the "paper" */}
              <div 
                className="absolute left-1/2 top-4 h-12 w-1 -translate-x-1/2 bg-black/10 blur-[2px] rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:h-full lg:grid-cols-[0.8fr_1.2fr_0.8fr] lg:overflow-hidden">
          {/* Column 1: Hero Image */}
          <section
            className="relative overflow-hidden rounded-[2rem] border text-white flex flex-col lg:h-full shadow-subtle"
            style={{
              borderColor: "rgba(0,0,0,0.1)",
              background: theme.heroGradient,
            }}
          >
            <img
              key={`img-${currentMonth.toISOString()}`}
              src={monthImages[currentMonth.getMonth()]}
              alt="Month background"
              className="absolute inset-0 h-full w-full object-cover animate-blur-in"
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div key={`txt-${currentMonth.toISOString()}`} className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6 sm:p-8 pointer-events-none animate-slide-up">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.5em] uppercase text-white/90 drop-shadow-md font-heading">
                  {format(currentMonth, "MMMM")}
                </p>
                <h1 className="mt-2 text-5xl font-light tracking-[0.1em] text-white drop-shadow-2xl sm:text-6xl font-heading">
                  {format(currentMonth, "yyyy")}
                </h1>
              </div>
            </div>
          </section>

          {/* Column 2: Calendar Grid */}
          <section
            className="flex flex-col gap-4 rounded-[2rem] border p-4 lg:h-full lg:overflow-hidden lg:justify-center shadow-subtle transition-colors duration-500"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderColor: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
          >
            <CalendarHeader
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              clearSelection={clearSelection}
            />

            <div className="flex-1 lg:overflow-hidden flex flex-col justify-center">
              <CalendarGrid
                currentMonth={currentMonth}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                activeDate={activeDate}
                notes={notes}
                onDaySelect={handleDaySelect}
                onDayHover={(day) => {
                  if (startDate && !endDate) setHoverDate(day);
                }}
              />
            </div>
          </section>

          {/* Column 3: Notes Side Panel (Laptops only) */}
          <section
            className="hidden lg:block lg:h-full lg:overflow-auto pr-1 p-2 rounded-[2rem] border shadow-subtle transition-colors duration-500"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderColor: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
          >
            <DetailPanel
              wrapperClassName="flex flex-col gap-4 h-full"
              isSidePanel={true}
              currentMonth={currentMonth}
              startDate={startDate}
              endDate={endDate}
              activeDate={activeDate}
              notes={notes}
              setNotes={setNotes}
            />
          </section>
        </div>

        {/* Notes for Mobile (below grid) */}
        <div className="mt-8 lg:hidden">
          <DetailPanel
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            activeDate={activeDate}
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      </div>
    </div>
  );
}

