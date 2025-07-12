import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';

const AllEmployees = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                        <div className="mb-6 sm:mb-8">
                            <h1 className="mb-2 text-2xl font-bold sm:text-3xl text-zinc-900 font-lexend">
                                All Employees
                            </h1>
                            <p className="font-light text-zinc-400 font-lexend">
                                Complete list and management of all employees
                            </p>
                        </div>

                        {/* Employee Table */}
                        <div className="overflow-hidden bg-white border rounded-lg border-zinc-400/20">
                            <EmployeeTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEmployees;
