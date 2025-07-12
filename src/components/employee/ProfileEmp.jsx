import { useState } from 'react';
import { User, Calendar, FolderOpen, FileText, Edit, Briefcase } from 'lucide-react';

export const ProfileEmp = ({ employeeData }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Sample employee data - bạn có thể truyền từ props
    const defaultEmployeeData = {
        firstName: 'Brooklyn',
        lastName: 'Simmons',
        email: 'brooklyn.s@example.com',
        position: 'Project Manager',
        mobile: '(702) 555-0122',
        dateOfBirth: 'July 14, 1995',
        maritalStatus: 'Married',
        gender: 'Female',
        nationality: 'America',
        address: '2464 Royal Ln. Mesa, New Jersey',
        city: 'California',
        state: 'United State',
        zipCode: '35624',
        avatar: 'https://placehold.co/100x100'
    };

    const employee = employeeData || defaultEmployeeData;

    const tabs = [
        { id: 0, name: 'Profile', icon: User, active: true },
        { id: 1, name: 'Attendance', icon: Calendar, active: false },
        { id: 2, name: 'Projects', icon: FolderOpen, active: false },
        { id: 3, name: 'Leave', icon: FileText, active: false }
    ];

    const personalInfoFields = [
        { label: 'First Name', value: employee.firstName },
        { label: 'Last Name', value: employee.lastName },
        { label: 'Mobile Number', value: employee.mobile },
        { label: 'Email Address', value: employee.email },
        { label: 'Date of Birth', value: employee.dateOfBirth },
        { label: 'Marital Status', value: employee.maritalStatus },
        { label: 'Gender', value: employee.gender },
        { label: 'Nationality', value: employee.nationality },
        { label: 'Address', value: employee.address },
        { label: 'City', value: employee.city },
        { label: 'State', value: employee.state },
        { label: 'Zip Code', value: employee.zipCode }
    ];

    const InfoField = ({ label, value }) => (
        <div className="w-full max-w-sm flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
                <div className="text-sm font-light text-zinc-400 font-lexend">
                    {label}
                </div>
                <div className="text-base font-light text-zinc-900 font-lexend">
                    {value}
                </div>
            </div>
            <div className="w-full h-px bg-zinc-400/10" />
        </div>
    );
    return (
        <div className="flex gap-6 p-6">
            {/* Sidebar nhỏ */}
            <div className="relative flex-shrink-0 h-56 w-60">
                <div className="w-full h-full rounded-[10px] border border-zinc-400/20 bg-white">
                    {/* Header */}
                    <div className="w-full h-14 bg-indigo-500 rounded-tl-[10px] rounded-tr-[10px] flex items-center px-5">
                        <div className="flex items-center gap-2.5">
                            <User className="w-6 h-6 text-white" />
                            <div className="text-base font-semibold text-white font-lexend">
                                Profile
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-5 space-y-4">
                        {tabs.slice(1).map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className="flex items-center gap-2.5 w-full text-left hover:opacity-70 transition-opacity"
                                >
                                    <Icon className="w-6 h-6 text-zinc-900" />
                                    <div className="text-base font-light text-zinc-900 font-lexend">
                                        {tab.name}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="flex flex-col flex-1 gap-7">
                {/* Header */}
                <div className="flex flex-col gap-7">
                    <div className="flex items-end justify-between w-full">
                        <div className="flex items-start gap-4">
                            <img
                                className="w-24 h-24 rounded-[10px] object-cover"
                                src={employee.avatar}
                                alt={`${employee.firstName} ${employee.lastName}`}
                            />
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-semibold text-zinc-900 font-lexend">
                                    {employee.firstName} {employee.lastName}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <Briefcase className="w-6 h-6 text-zinc-900" />
                                        <div className="text-base font-light text-zinc-900 font-lexend">
                                            {employee.position}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Calendar className="w-6 h-6 text-zinc-900" />
                                        <div className="text-base font-light text-zinc-900 font-lexend">
                                            {employee.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="h-12 px-5 bg-indigo-500 rounded-[10px] flex items-center gap-2.5 hover:bg-indigo-600 transition-colors">
                            <Edit className="w-6 h-6 text-white" />
                            <div className="text-base font-light text-white font-lexend">
                                Edit Profile
                            </div>
                        </button>
                    </div>
                    <div className="w-full h-px bg-zinc-400/20" />
                </div>

                {/* Personal Information */}
                {activeTab === 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2.5">
                            <User className="w-6 h-6 text-indigo-500" />
                            <div className="text-base font-semibold text-indigo-500 font-lexend">
                                Personal Information
                            </div>
                        </div>
                        <div className="w-full h-px bg-zinc-400/20" />
                        <div className="w-52 h-[3px] bg-indigo-500 rounded-full" />

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {personalInfoFields.map((field, index) => (
                                <InfoField key={index} label={field.label} value={field.value} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other tabs placeholder */}
                {activeTab === 1 && (
                    <div className="py-20 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                        <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                            Attendance
                        </h3>
                        <p className="text-zinc-400 font-lexend">
                            Attendance information will be displayed here
                        </p>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="py-20 text-center">
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                        <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                            Projects
                        </h3>
                        <p className="text-zinc-400 font-lexend">
                            Project information will be displayed here
                        </p>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="py-20 text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                        <h3 className="mb-2 text-xl font-semibold text-zinc-900 font-lexend">
                            Leave
                        </h3>
                        <p className="text-zinc-400 font-lexend">
                            Leave information will be displayed here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
