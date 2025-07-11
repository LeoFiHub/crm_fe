import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header = ({ userName = "Robert Allen", userRole = "HR Manager", greeting = "Good Morning" }) => {
    return (
        <div className="w-full bg-white border-b border-zinc-400/20 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Greeting */}
                <div className="flex flex-col">
                    <div className="text-zinc-900 text-xl font-semibold font-lexend leading-loose">
                        Hello {userName.split(' ')[0]} 👋🏻
                    </div>
                    <div className="text-zinc-400 text-sm font-light font-lexend leading-snug">
                        {greeting}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="w-64 px-4 py-3 rounded-[10px] border border-zinc-400/10 flex items-center gap-2.5">
                        <Search className="w-6 h-6 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 text-zinc-900 text-base font-light font-lexend bg-transparent border-none outline-none placeholder-zinc-400"
                        />
                    </div>

                    {/* Notification Button */}
                    <button className="w-12 h-12 p-3 bg-zinc-400/10 rounded-[10px] flex justify-center items-center hover:bg-zinc-400/20 transition-colors">
                        <Bell className="w-6 h-6 text-zinc-900" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 p-2 rounded-lg border border-zinc-400/20 hover:bg-gray-50 transition-colors">
                        <img
                            className="w-10 h-10 rounded-lg object-cover"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt={userName}
                        />
                        <div className="flex flex-col">
                            <div className="text-zinc-900 text-base font-semibold font-lexend leading-normal">
                                {userName}
                            </div>
                            <div className="text-zinc-400 text-xs font-light font-lexend leading-none">
                                {userRole}
                            </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-zinc-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
