import {CalendarEvent} from "../data/data.ts";
import EventItem from "./EventItem.tsx";
import {useState} from "react";
import EventModal from "./eventModal.tsx";
import useCalender from "../hooks/useCalender.tsx";

interface CalenderCellProps {
    date: Date;
    events: CalendarEvent[];
}

const CalenderCell = ( { date, events } : CalenderCellProps ) => {
    const today = new Date();
    let sameDate = false;
    if (date.getDate() === today.getDate()){
        console.log(date.getDate());
        sameDate = true;
    }

    const { currentMonth } = useCalender();
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            className={`p-2 min-h-[120px] border border-white/30 backdrop-blur-sm rounded-md shadow-sm transition
        ${!isCurrentMonth
                ? 'bg-white/20 text-[#a9a9a9]'
                : sameDate
                    ? "bg-[#FE7743]/20 [&_div]:text-[#FE7743]"
                    : "bg-white/30 hover:bg-white/40"}`
            }
        >
            <div className={`text-right font-bold text-xl mb-1 ${!isCurrentMonth ? 'text-[#b0b0b0]' : "text-[#273F4F]"}`}>
                {date.getDate()}
            </div>

            <div className="space-y-1">
                {events.map((event, index) => index < 1 && (
                    <EventItem key={index} event={event} />
                ))}

                {events.length > 1 && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-[#FE7743] hover:text-[#d65421] w-full text-left"
                    >
                        +{events.length - 1} more
                    </button>
                )}
            </div>

            {showModal && (
                <EventModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    events={events}
                    date={date}
                />
            )}
        </div>


    )
}
export default CalenderCell
