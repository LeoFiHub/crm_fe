import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { Users, Building2, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        {
            title: "Total Employees",
            value: "245",
            change: "+12%",
            changeType: "positive",
            icon: Users,
            color: "bg-blue-500"
        },
        {
            title: "Departments",
            value: "8",
            change: "+2",
            changeType: "positive",
            icon: Building2,
            color: "bg-green-500"
        },
        {
            title: "Present Today",
            value: "189",
            change: "77%",
            changeType: "neutral",
            icon: Clock,
            color: "bg-yellow-500"
        },
        {
            title: "Monthly Growth",
            value: "15%",
            change: "+5%",
            changeType: "positive",
            icon: TrendingUp,
            color: "bg-purple-500"
        }
    ];

    const StatCard = ({ title, value, change, changeType, icon, color }) => {
        const Icon = icon;
        return (
            <div className="p-4 bg-white border rounded-lg border-zinc-400/20 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${changeType === 'positive' ? 'text-green-600 bg-green-100' :
                        changeType === 'negative' ? 'text-red-600 bg-red-100' :
                            'text-gray-600 bg-gray-100'
                        }`}>
                        {change}
                    </span>
                </div>
                <div>
                    <p className="mb-1 text-2xl font-bold sm:text-3xl text-zinc-900 font-lexend">{value}</p>
                    <p className="text-sm sm:text-base text-zinc-400 font-lexend">{title}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 lg:flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                <div className="flex flex-col">
                    {/* Header */}
                    <Header onMenuClick={() => setSidebarOpen(true)} />

                    {/* Content Area */}
                    <div className="flex-1 p-4 sm:p-6">
                        {/* Page Title */}
                        <div className="mb-6 sm:mb-8">
                            <h1 className="mb-2 text-2xl font-bold sm:text-3xl text-zinc-900 font-lexend">
                                Dashboard
                            </h1>
                            <p className="font-light text-zinc-400 font-lexend">
                                Welcome back! Here's what's happening at your company today.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6 sm:mb-8">
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            {/* Quick Actions & Recent Activity */}
                            <div className="space-y-6 xl:col-span-2">
                                {/* Quick Actions */}
                                <div className="p-4 bg-white border rounded-lg border-zinc-400/20 sm:p-6">
                                    <h3 className="mb-4 text-lg font-semibold sm:text-xl text-zinc-900 font-lexend">
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <button className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-zinc-400/20 hover:bg-gray-50">
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                                                <Users className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-zinc-900 font-lexend sm:text-base">Add Employee</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">Register new team member</p>
                                            </div>
                                        </button>

                                        <button className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-zinc-400/20 hover:bg-gray-50">
                                            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                                                <Building2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-zinc-900 font-lexend sm:text-base">Create Department</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">Set up new department</p>
                                            </div>
                                        </button>

                                        <button className="flex items-center gap-3 p-4 transition-colors border rounded-lg border-zinc-400/20 hover:bg-gray-50 sm:col-span-2 lg:col-span-1">
                                            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                                                <Clock className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-zinc-900 font-lexend sm:text-base">Mark Attendance</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">Record daily attendance</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="p-4 bg-white border rounded-lg border-zinc-400/20 sm:p-6">
                                    <h3 className="mb-4 text-lg font-semibold sm:text-xl text-zinc-900 font-lexend">
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                                <Users className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate text-zinc-900 font-lexend sm:text-base">New employee joined</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">Sarah Johnson joined the Marketing team</p>
                                            </div>
                                            <span className="text-xs text-zinc-400 whitespace-nowrap">2 hours ago</span>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate text-zinc-900 font-lexend sm:text-base">Attendance updated</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">Monthly attendance report generated</p>
                                            </div>
                                            <span className="text-xs text-zinc-400 whitespace-nowrap">4 hours ago</span>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                                            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                                                <Building2 className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate text-zinc-900 font-lexend sm:text-base">Department restructure</p>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-lexend">IT Department expanded with 5 new roles</p>
                                            </div>
                                            <span className="text-xs text-zinc-400 whitespace-nowrap">1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Calendar */}
                            <div className="xl:col-span-1">
                                <div className="sticky top-6">
                                    <ScheduleCalendar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
