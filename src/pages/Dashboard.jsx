import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { Users, Building2, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
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
            <div className="bg-white rounded-lg border border-zinc-400/20 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' :
                            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {change}
                    </span>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-zinc-400 font-light font-lexend">{title}</p>
                    <p className="text-2xl font-semibold text-zinc-900 font-lexend">{value}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 z-30">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-72">
                <div className="p-6">
                    {/* Header */}
                    <Header />

                    {/* Content Area */}
                    <div className="mt-8">
                        {/* Page Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-zinc-900 font-lexend mb-2">
                                Dashboard
                            </h1>
                            <p className="text-zinc-400 font-light font-lexend">
                                Welcome back! Here's what's happening at your company today.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg border border-zinc-400/20 p-6">
                                    <h3 className="text-xl font-semibold text-zinc-900 font-lexend mb-6">
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900 font-lexend">New employee joined</p>
                                                <p className="text-sm text-zinc-400 font-lexend">Sarah Johnson joined the Marketing team</p>
                                            </div>
                                            <span className="text-xs text-zinc-400">2 hours ago</span>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900 font-lexend">Attendance updated</p>
                                                <p className="text-sm text-zinc-400 font-lexend">Monthly attendance report generated</p>
                                            </div>
                                            <span className="text-xs text-zinc-400">4 hours ago</span>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900 font-lexend">Department restructure</p>
                                                <p className="text-sm text-zinc-400 font-lexend">IT Department expanded with 5 new roles</p>
                                            </div>
                                            <span className="text-xs text-zinc-400">1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Calendar */}
                            <div className="lg:col-span-1">
                                <ScheduleCalendar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
