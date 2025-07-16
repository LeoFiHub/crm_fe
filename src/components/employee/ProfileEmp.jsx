import { useState } from 'react';
import { User, Calendar, Edit, Briefcase } from 'lucide-react';

export const ProfileEmp = ({ employeeData }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Sample employee data - bạn có thể truyền từ props
    const defaultEmployeeData = {
        // firstName: 'Brooklyn',
        // lastName: 'Simmons',
        fullname: 'Brooklyn Simmons',
        email: 'brooklyn.s@example.com',
        // position: 'Project Manager',
        mobile: '(702) 555-0122',
        dateOfBirth: 'July 14, 1995',
        maritalStatus: 'Married',
        gender: 'Female',
        nationality: 'America',
        address: '2464 Royal Ln. Mesa, New Jersey',
        // city: 'California',
        // state: 'United State',
        // zipCode: '35624',
        // avatar: 'https://placehold.co/100x100'
    };

    const employee = employeeData || defaultEmployeeData;

    const personalInfoFields = [
        // { label: 'First Name', value: employee.firstName },
        // { label: 'Last Name', value: employee.lastName },
        { label: 'Full name', value: employee.fullname },
        { label: 'Mobile Number', value: employee.mobile },
        { label: 'Email Address', value: employee.email },
        { label: 'Date of Birth', value: employee.dateOfBirth },
        { label: 'Marital Status', value: employee.maritalStatus },
        { label: 'Gender', value: employee.gender },
        { label: 'Nationality', value: employee.nationality },
        { label: 'Address', value: employee.address },
        // { label: 'City', value: employee.city },
        // { label: 'State', value: employee.state },
        // { label: 'Zip Code', value: employee.zipCode }
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
            {/* Nội dung chính */}
            <div className="flex flex-col flex-1 gap-7">
                {/* Header */}
                <div className="flex flex-col gap-7">
                    <div className="flex items-end justify-between w-full">
                        <div className="flex items-start gap-4">
                            {/* <img
                                className="w-24 h-24 rounded-[10px] object-cover"
                                src={employee.avatar}
                                alt={`${employee.firstName} ${employee.lastName}`}
                            /> */}
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-semibold text-zinc-900 font-lexend">
                                    {employee.fullname}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {/* <div className="flex items-center gap-2.5">
                                        <Briefcase className="w-6 h-6 text-zinc-900" />
                                        <div className="text-base font-light text-zinc-900 font-lexend">
                                            {employee.position}
                                        </div>
                                    </div> */}
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

              
            </div>
        </div>
    );
};
