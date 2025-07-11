import React from 'react';
import { Eye, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeTable = () => {
    const employees = [
        {
            id: 1,
            name: "Bessie Cooper",
            phone: "091233412",
            department: "HR",
            designation: "HR Manager",
            type: "Office",
            status: "Permanent",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        },
        {
            id: 2,
            name: "Devon Lane",
            phone: "091233412",
            department: "BA",
            designation: "Business Analyst",
            type: "Remote",
            status: "Permanent",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
        }
    ];

    const ActionButton = ({ icon, className = "" }) => {
        const Icon = icon;
        return (
            <button className={`w-6 h-6 hover:bg-gray-100 rounded transition-colors ${className}`}>
                <Icon className="w-6 h-6 text-zinc-900" />
            </button>
        );
    };

    return (
        <div className="w-full bg-white overflow-hidden">
            {/* Table Header */}
            <div className="w-full h-16 bg-zinc-400/5 border-b border-zinc-400/10 flex items-center">
                <div className="flex-1 px-4 py-2.5">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Employee Name
                    </div>
                </div>
                <div className="w-32 px-4 py-2.5 hidden md:block">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Phone
                    </div>
                </div>
                <div className="w-44 px-4 py-2.5 hidden lg:block">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Department
                    </div>
                </div>
                <div className="w-40 px-4 py-2.5 hidden xl:block">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Designation
                    </div>
                </div>
                <div className="w-28 px-4 py-2.5 hidden lg:block">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Type
                    </div>
                </div>
                <div className="w-28 px-4 py-2.5">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Status
                    </div>
                </div>
                <div className="w-24 px-4 py-2.5">
                    <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                        Action
                    </div>
                </div>
            </div>

            {/* Table Rows */}
            {employees.map((employee) => (
                <div key={employee.id} className="w-[1040px] border-b border-zinc-400/10 inline-flex justify-start items-center hover:bg-gray-50 transition-colors">
                    <div className="flex-1 pr-2.5 py-4 flex justify-start items-center gap-2.5">
                        <img
                            className="w-9 h-9 rounded-full object-cover"
                            src={employee.avatar}
                            alt={employee.name}
                        />
                        <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                            {employee.name}
                        </div>
                    </div>
                    <div className="w-32 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                            {employee.phone}
                        </div>
                    </div>
                    <div className="w-44 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                            {employee.department}
                        </div>
                    </div>
                    <div className="w-40 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                            {employee.designation}
                        </div>
                    </div>
                    <div className="w-28 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                            {employee.type}
                        </div>
                    </div>
                    <div className="w-28 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="px-2 py-[3px] bg-indigo-500/10 rounded flex justify-center items-center gap-2.5">
                            <div className="justify-center text-indigo-500 text-xs font-light font-lexend leading-none">
                                {employee.status}
                            </div>
                        </div>
                    </div>
                    <div className="w-24 pr-2.5 py-2.5 flex justify-start items-start gap-2.5">
                        <div className="flex justify-start items-start gap-2.5">
                            <ActionButton icon={Eye} />
                            <ActionButton icon={Edit} />
                            <ActionButton icon={Trash2} />
                        </div>
                    </div>
                </div>
            ))}

            {/* Table Footer - Pagination */}
            <div className="w-[1040px] py-6 inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-5">
                    <div className="justify-start text-zinc-400 text-sm font-light font-lexend leading-snug">
                        Showing
                    </div>
                    <div className="relative">
                        <select className="w-20 h-11 bg-white rounded-[10px] border border-zinc-400/20 px-3 appearance-none">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-2 top-3 text-zinc-900 pointer-events-none" />
                    </div>
                </div>

                <div className="justify-start text-zinc-400 text-sm font-light font-lexend leading-snug">
                    Showing 1 to 10 out of 60 records
                </div>

                <div className="flex justify-start items-center gap-2.5">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <ChevronLeft className="w-6 h-6 text-zinc-900" />
                    </button>
                    <div className="flex justify-start items-start gap-[5px]">
                        <button className="w-9 px-3 py-1.5 rounded-lg border border-indigo-500 flex justify-center items-center gap-2.5">
                            <div className="justify-center text-indigo-500 text-sm font-semibold font-lexend leading-snug">1</div>
                        </button>
                        <button className="px-3 py-1.5 bg-white rounded-[50px] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors">
                            <div className="justify-center text-zinc-900 text-sm font-light font-lexend leading-snug">2</div>
                        </button>
                        <button className="px-3 py-1.5 bg-white rounded-[50px] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors">
                            <div className="justify-center text-zinc-900 text-sm font-light font-lexend leading-snug">3</div>
                        </button>
                        <button className="px-3 py-1.5 bg-white rounded-[50px] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors">
                            <div className="justify-center text-zinc-900 text-sm font-light font-lexend leading-snug">4</div>
                        </button>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <ChevronRight className="w-6 h-6 text-zinc-900" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTable;
