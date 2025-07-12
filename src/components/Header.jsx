import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

const Header = ({
    userName = "Robert Allen",
    userRole = "HR Manager",
    greeting = "Good Morning",
    onMenuClick
}) => {
    return (
        <div className="w-full bg-white border-b border-zinc-400/20 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-zinc-900" />
                    </button>

                    {/* Greeting */}
                    <div className="flex flex-col">
                        <div className="text-zinc-900 text-lg sm:text-xl font-semibold font-lexend leading-loose">
                            Hello {userName.split(' ')[0]} 👋🏻
                        </div>
                        <div className="text-zinc-400 text-xs sm:text-sm font-light font-lexend leading-snug">
                            {greeting}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex w-48 lg:w-64 px-4 py-3 rounded-[10px] border border-zinc-400/10 items-center gap-2.5">
                        <Search className="w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 text-zinc-900 text-sm lg:text-base font-light font-lexend bg-transparent border-none outline-none placeholder-zinc-400"
                        />
                    </div>

                    {/* Search Button for Mobile */}
                    <button className="md:hidden w-10 h-10 p-2 bg-zinc-400/10 rounded-[10px] flex justify-center items-center hover:bg-zinc-400/20 transition-colors">
                        <Search className="w-5 h-5 text-zinc-900" />
                    </button>

                    {/* Notification Button */}
                    <button className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-3 bg-zinc-400/10 rounded-[10px] flex justify-center items-center hover:bg-zinc-400/20 transition-colors">
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg border border-zinc-400/20 hover:bg-gray-50 transition-colors">
                        <img
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt={userName}
                        />
                        {/* User Info - Hidden on mobile */}
                        <div className="hidden sm:flex flex-col">
                            <div className="text-zinc-900 text-sm lg:text-base font-semibold font-lexend leading-normal">
                                {userName}
                            </div>
                            <div className="text-zinc-400 text-xs font-light font-lexend leading-none">
                                {userRole}
                            </div>
                        </div>
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
