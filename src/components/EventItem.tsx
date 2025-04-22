import {CalendarEvent} from "../data/data.ts";
import {getContrastingTextColor} from "../service/textColorService.ts";

interface EventItemProps {
    event: CalendarEvent;
}

const EventItem = ({ event }: EventItemProps) => {
     function formatEventTime(start: string, end: string): string {
        return `${start} - ${end}`;
    }

    const textColor = getContrastingTextColor(event.color);

    return (
        <div
            className={`event-item mb-1 rounded p-1 text-sm truncate ${event.conflict ? "border-2 border-red-500" : ""}`}
            style={{
                backgroundColor: event.color,
                color: textColor,
            }}
        >
            <div className="event-time font-medium">
                {formatEventTime(event.startTime, event.endTime)}
            </div>
            <div className="event-title">{event.title}</div>
        </div>
    );
}
export default EventItem
