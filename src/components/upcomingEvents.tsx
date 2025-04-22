import {finalEvents} from "../data/data.ts";
import {getContrastingTextColor} from "../service/textColorService.ts";
import {format} from "date-fns";

const UpcomingEvents = () => {
    return (
        <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 h-fit">
            <h2 className="text-xl font-bold text-[#273F4F] mb-4">Upcoming Events</h2>
            <div className="space-y-3">
                {finalEvents
                    .filter(event => new Date(event.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 5)
                    .map((event, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg text-sm shadow-sm"
                            style={{
                                backgroundColor: event.color,
                                color: getContrastingTextColor(event.color)
                            }}
                        >
                            <div className="font-semibold truncate">{event.title} hello</div>
                            <div>{event.startTime} - {event.endTime}</div>
                            <div className="text-xs opacity-80">
                                {format(new Date(event.date), 'MMM dd, yyyy')}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default UpcomingEvents
