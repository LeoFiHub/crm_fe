import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';

const AllEmployees = () => {
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
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-zinc-900 font-lexend mb-2">
                                All Employees
                            </h1>
                            <p className="text-zinc-400 font-light font-lexend">
                                Complete list and management of all employees
                            </p>
                        </div>

                        {/* Employee Table */}
                        <div className="bg-white rounded-lg border border-zinc-400/20 overflow-hidden">
                            <EmployeeTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEmployees;
