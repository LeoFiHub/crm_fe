import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const ScheduleCalendar = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Generate calendar days for July 2023
    const calendarDays = [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, null, null, null, null, null, null]
    ];

    const scheduleItems = [
        {
            date: "Wednesday, 06 July 2023",
            items: [
                {
                    time: "09:30",
                    title: "Practical Task Review",
                    subtitle: "UI/UX Designer"
                },
                {
                    time: "12:00",
                    title: "Resume Review",
                    subtitle: "Magento Developer"
                },
                {
                    time: "01:30",
                    title: "Final HR Round",
                    subtitle: "Sales Manager"
                }
            ]
        },
        {
            date: "Thursday, 07 July 2023",
            items: [
                {
                    time: "09:30",
                    title: "Practical Task Review",
                    subtitle: "Front end Developer"
                },
                {
                    time: "11:00",
                    title: "TL Meeting",
                    subtitle: "React JS"
                }
            ]
        }
    ];

    const ScheduleItem = ({ time, title, subtitle }) => (
        <div className="flex justify-start items-center gap-5">
            <div className="justify-center text-zinc-900 text-lg font-semibold font-lexend leading-relaxed">
                {time}
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500/0" />
            <div className="inline-flex flex-col justify-start items-start gap-[5px]">
                <div className="justify-center text-zinc-900 text-sm font-light font-lexend leading-snug">
                    {subtitle}
                </div>
                <div className="justify-center text-zinc-900 text-base font-semibold font-lexend leading-normal">
                    {title}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-96 h-[882px] rounded-[10px] border border-zinc-400/20 relative bg-white">
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-zinc-900 text-xl font-semibold font-lexend leading-loose">
                        My Schedule
                    </h3>
                    <button className="w-12 h-12 p-3 bg-indigo-500/10 rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-indigo-500/20 transition-colors">
                        <Calendar className="w-6 h-6 text-indigo-500" />
                    </button>
                </div>

                {/* Calendar Navigation */}
                <div className="flex justify-center items-center gap-4 mb-6">
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5 text-zinc-900" />
                    </button>
                    <h4 className="text-center text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        July, 2023
                    </h4>
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5 text-zinc-900" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                    {/* Days of week header */}
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-center text-zinc-900 text-base font-light font-lexend leading-normal py-2">
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {calendarDays.flat().map((day, index) => (
                        <div key={index} className="relative flex justify-center items-center h-10">
                            {day && (
                                <>
                                    <span className={`text-center text-base font-light font-lexend leading-normal ${day === 6 || day === 8 ? 'text-white' : 'text-zinc-900'
                                        }`}>
                                        {day}
                                    </span>
                                    {(day === 6 || day === 8) && (
                                        <div className="absolute inset-0 w-9 h-9 bg-indigo-500 rounded-full mx-auto" />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-zinc-400/10 mb-6" />
            </div>

            {/* Schedule List */}
            <div className="px-6 space-y-8 overflow-y-auto max-h-96">
                {scheduleItems.map((daySchedule, dayIndex) => (
                    <div key={dayIndex} className="space-y-4">
                        <div className="text-zinc-900 text-base font-light font-lexend leading-normal">
                            {daySchedule.date}
                        </div>
                        <div className="space-y-6">
                            {daySchedule.items.map((item, itemIndex) => (
                                <ScheduleItem key={itemIndex} {...item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleCalendar;
