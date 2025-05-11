import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { useTodos } from "../../context/TodoContext";
import { parseISO } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useTheme } from "../../context/ThemeContext";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const { todos } = useTodos();
  const { theme } = useTheme();
  
  const events = todos.map((t) => ({
    id: t.id,
    title: t.text + (t.isImportant ? " ⭐" : ""),
    start: parseISO(t.date),
    end: parseISO(t.date),
    allDay: true,
    resource: t,
  }));

  // Custom event styling based on theme and importance
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.resource.isImportant 
        ? (theme === 'dark' ? '#b45309' : '#fbbf24') 
        : (theme === 'dark' ? '#1d4ed8' : '#3b82f6'),
      color: '#fff',
      borderRadius: '4px',
    };
    return { style };
  };

  return (
    <div className="h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <style>
        {`
          /* Override BigCalendar styles for dark mode */
          .dark .rbc-calendar {
            background-color: #1f2937;
            color: #f3f4f6;
          }
          .dark .rbc-header {
            background-color: #374151;
            color: #f3f4f6;
          }
          .dark .rbc-month-view {
            border-color: #4b5563;
          }
          .dark .rbc-day-bg {
            background-color: #1f2937;
          }
          .dark .rbc-off-range {
            background-color: #111827;
            color: #6b7280;
          }
          .dark .rbc-today {
            background-color: #3730a3;
          }
          .dark .rbc-month-row, .dark .rbc-header, .dark .rbc-day-bg, .dark .rbc-time-view {
            border-color: #4b5563;
          }
        `}
      </style>
      <BigCalendar
        localizer={localizer}
        events={events}
        toolbar={false}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
