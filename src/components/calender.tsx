import CalenderCell from "./calenderCell.tsx";
import useCalender from "../hooks/useCalender.tsx";
import {finalEvents} from "../data/data.ts";
import {format} from "date-fns";
import React from "react";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";
import UpcomingEvents from "./upcomingEvents.tsx";

const Calender = () => {
    const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const {months ,prevMonth, nextMonth, calendarDays, currentMonth, handleMonthChange, handleYearChange} = useCalender();

    const years = [2023, 2024, 2025, 2026];

    finalEvents.forEach(item => {
        console.log(item.title);
    })

    return (<div className="max-w-[1380px] mx-auto p-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="col-span-2 bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <select
                        value={currentMonth.getMonth()}
                        onChange={handleMonthChange}
                        className="bg-white/30 border border-white/30 text-[#273F4F] font-semibold rounded px-2 py-1 outline-none shadow-sm"
                    >
                        {months.map((month, i) => (
                            <option key={i} value={i}>
                                {month}
                            </option>
                        ))}
                    </select>

                    <select
                        value={currentMonth.getFullYear()}
                        onChange={handleYearChange}
                        className="bg-white/30 border border-white/30 text-[#273F4F] font-semibold rounded px-2 py-1 outline-none shadow-sm"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 bg-[#273F4F] text-white rounded-full hover:bg-[#1c2f3a] transition"
                    >
                        <SlArrowLeft />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 bg-[#273F4F] text-white rounded-full hover:bg-[#1c2f3a] transition"
                    >
                        <SlArrowRight />
                    </button>
                </div>
            </div>

            <div className="calender-grid">
                {WEEKS.map(day => (
                    <div key={day} className="text-center font-bold py-2 text-[#FE7743]">
                        {day}
                    </div>
                ))}
                {calendarDays.map(date => {
                    const filteredEvents = finalEvents.filter(event => {
                        const givenDate = format(date, "yyyy-MM-dd");
                        return event.date === givenDate;
                    });
                    return (
                        <React.Fragment key={date.toString()}>
                            <CalenderCell date={date} events={filteredEvents} />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>

            {/* Upcoming Events Sidebar */}
            <UpcomingEvents/>
        </div>
    )
}
export default Calender
