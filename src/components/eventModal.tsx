import {CalendarEvent} from "../data/data.ts";
import {useEffect, useRef} from "react";
import {format} from "date-fns";
import {getContrastingTextColor} from "../service/textColorService.ts";
import {createPortal} from "react-dom";


interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date;
    events: CalendarEvent[];
}

const EventModal = ({isOpen, onClose, events, date}: EventModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div
                ref={modalRef}
                className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl max-h-[80vh] overflow-y-auto text-black"
            >
                <div className="p-4 border-b border-white/20 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#273F4F]">
                        Events for {format(date, 'MMMM d, yyyy')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-[#273F4F] hover:text-[#FE7743] text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {events.map((event, index) => {
                        const textColor = getContrastingTextColor(event.color);
                        return (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${event.conflict ? "border-2 border-red-500" : ""}`}
                                style={{
                                    backgroundColor: event.color,
                                    color: textColor,
                                }}
                            >
                                <div className="font-semibold">{event.title}</div>
                                <div className="text-sm opacity-90">
                                    {event.startTime} - {event.endTime}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body
    )
}
export default EventModal
