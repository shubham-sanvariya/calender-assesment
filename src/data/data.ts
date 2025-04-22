import {format} from "date-fns";

export interface CalendarEvent {
    title: string;
    startTime: string; // Format: "HH:MM"
    endTime: string;   // Format: "HH:MM"
    color: string;     // Hex color code
    date: string;      // Format: "YYYY-MM-DD"
    conflict?: boolean;
}

export const EVENTS : CalendarEvent[] = [
    {
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#f6be23",
        date: "2025-04-15",
    },{
        title: "Daily Standup",
        startTime: "09:20",
        endTime: "10:30",
        color: "#33FF57",
        date: "2025-04-15",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#3357FF",
        date: "2025-04-16",
    },{
        title: "Daily Standup",
        startTime: "19:00",
        endTime: "20:30",
        color: "#FF33A1",
        date: "2025-04-16",
    },{
        title: "Daily Standup",
        startTime: "11:00",
        endTime: "11:30",
        color: "#A133FF",
        date: "2025-04-16",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#33FFF1",
        date: "2025-04-20",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#FFC733",
        date: "2025-04-5",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#33FF8C",
        date: "2025-04-11",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#8C33FF",
        date: "2025-04-7",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#F1FF33",
        date: "2025-04-4",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#F1FF33",
        date: "2025-04-24",
    },{
        title: "Daily Standup",
        startTime: "09:00",
        endTime: "09:30",
        color: "#FF33A1",
        date: "2025-04-27",
    },
]

const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const hasConflict = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
    return event1.date === event2.date &&
        toMinutes(event1.startTime) < toMinutes(event2.endTime) &&
        toMinutes(event2.startTime) < toMinutes(event1.endTime);
};

// Check conflicts for all events
export const finalEvents = EVENTS.map(item => {
    const [year, month, day] = item.date.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    const normalizedDate = format(localDate, 'yyyy-MM-dd');

    const conflict = EVENTS.some(event => {
        const [ey, em, ed] = event.date.split('-').map(Number);
        const eventDate = new Date(ey, em - 1, ed);
        return (
            event !== item &&
            format(eventDate, 'yyyy-MM-dd') === normalizedDate &&
            hasConflict(item, event)
        );
    });

    return { ...item, date: normalizedDate, conflict };
});

console.log(finalEvents);


