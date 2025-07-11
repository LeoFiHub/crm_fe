import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Building2,
    Clock,
    DollarSign,
    Briefcase,
    UserCheck,
    FileText,
    Calendar,
    Settings,
    Sun,
    Moon
} from 'lucide-react';

const Sidebar = () => {
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'All Employees', path: '/employees' },
        { icon: Building2, label: 'All Departments', path: '/departments' },
        { icon: Clock, label: 'Attendance', path: '/attendance' },
        { icon: DollarSign, label: 'Payroll', path: '/payroll' },
        { icon: Briefcase, label: 'Jobs', path: '/jobs' },
        { icon: UserCheck, label: 'Candidates', path: '/candidates' },
        { icon: FileText, label: 'Leaves', path: '/leaves' },
        { icon: Calendar, label: 'Holidays', path: '/holidays' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const handleMenuClick = (path) => {
        navigate(path);
    };

    const MenuItem = ({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;

        return (
            <div className="relative">
                {/* Background */}
                <div
                    className={`w-full h-12 rounded-tr-[10px] rounded-br-[10px] cursor-pointer transition-all ${isActive ? 'bg-indigo-500/5' : 'opacity-0 hover:bg-indigo-500/5 hover:opacity-100'
                        }`}
                    onClick={() => handleMenuClick(path)}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center px-6 gap-3 pointer-events-none">
                    {Icon && <Icon className={`w-6 h-6 ${isActive ? 'text-indigo-500' : 'text-zinc-900'}`} />}
                    <span className={`text-base font-lexend ${isActive ? 'text-indigo-500 font-semibold' : 'text-zinc-900 font-light'
                        }`}>
                        {label}
                    </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                    <div className="w-[3px] h-12 bg-indigo-500 rounded-[10px] absolute right-0 top-0" />
                )}
            </div>
        );
    };

    return (
        <div className="w-72 min-h-screen max-h-screen relative flex flex-col">
            {/* Background */}
            <div className="w-72 h-full absolute bg-zinc-400/5 rounded-[20px]" />

            {/* Logo */}
            <div className="relative z-10 pt-[30px] px-[30px]">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-violet-500 rounded-3xl flex items-center justify-center">
                        <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-violet-500 font-bold text-sm">C</span>
                        </div>
                    </div>
                    <span className="text-zinc-900 font-semibold text-lg font-lexend">CRM</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="relative z-10 flex-1 px-[30px] pt-[50px] pb-[100px] overflow-y-auto">
                <div className="space-y-2.5">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} {...item} />
                    ))}
                </div>
            </div>

            {/* Theme Toggle */}
            <div className="relative z-10 px-[30px] pb-[30px]">
                <div className="w-full h-12 bg-zinc-400/5 rounded-[10px] relative">
                    {/* Light Theme Button */}
                    <div className={`w-1/2 h-12 absolute rounded-[10px] transition-all ${theme === 'light' ? 'bg-indigo-500' : 'bg-transparent'
                        }`} />

                    {/* Buttons */}
                    <div className="flex h-12">
                        <button
                            onClick={() => setTheme('light')}
                            className="flex-1 flex items-center justify-center gap-2.5"
                        >
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-white' : 'text-zinc-900'}`} />
                            <span className={`text-base font-light font-lexend ${theme === 'light' ? 'text-white' : 'text-zinc-900'
                                }`}>
                                Light
                            </span>
                        </button>

                        <button
                            onClick={() => setTheme('dark')}
                            className="flex-1 flex items-center justify-center gap-2.5"
                        >
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`} />
                            <span className={`text-base font-light font-lexend ${theme === 'dark' ? 'text-white' : 'text-zinc-900'
                                }`}>
                                Dark
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
