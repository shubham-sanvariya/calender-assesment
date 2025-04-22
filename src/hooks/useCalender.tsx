import {addDays, addMonths, eachDayOfInterval, endOfMonth, format, getDay, startOfMonth, subMonths} from "date-fns";
import React, {useState} from "react";

const UseCalender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    // Start calendar on Sunday
    const startDate = addDays(monthStart, -getDay(monthStart));
    // End calendar on Saturday
    const endDate = addDays(monthEnd, 6 - getDay(monthEnd));

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value);
        const updatedDate = new Date(currentMonth);
        updatedDate.setMonth(newMonth);
        setCurrentMonth(updatedDate);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value);
        const updatedDate = new Date(currentMonth);
        updatedDate.setFullYear(newYear);
        setCurrentMonth(updatedDate);
    };

    const months = [...Array(12)].map((_, i) =>
        format(new Date(2025, i, 1), "MMMM")
    );

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    return { calendarDays ,prevMonth, nextMonth, currentMonth, handleMonthChange, handleYearChange, months }
}
export default UseCalender
