import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Download, ExternalLink, Filter } from 'lucide-react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { getCurrentUser, mockPayrollSchedule, mockTransactions } from '../../utils/mockData';

const SalaryHistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.roles !== 'employee') {
        navigate('/login');
        return null;
    }

    // Filter salary history for current user
    const userSalaryHistory = mockPayrollSchedule.filter(p => p.id_employee === currentUser.id);
    const userTransactions = mockTransactions.filter(tx =>
        tx.employee_name === currentUser.fullName && tx.type === 'payroll'
    );

    const filteredHistory = selectedFilter === 'all'
        ? userSalaryHistory
        : userSalaryHistory.filter(p => p.status === selectedFilter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-700';
            case 'approved':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const openBlockExplorer = (txHash) => {
        // Mock block explorer URL
        const url = `https://etherscan.io/tx/${txHash}`;
        window.open(url, '_blank');
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
                        {/* Page Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-zinc-900 font-lexend mb-2">
                                Salary History 📊
                            </h1>
                            <p className="text-zinc-600 font-lexend">
                                View your complete salary payment history
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="text-2xl font-bold text-green-600 font-lexend">
                                    {userSalaryHistory.filter(p => p.status === 'paid').length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Payments Received
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="text-2xl font-bold text-blue-600 font-lexend">
                                    ${userSalaryHistory
                                        .filter(p => p.status === 'paid')
                                        .reduce((sum, p) => sum + p.amount, 0)
                                        .toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Total Earned
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="text-2xl font-bold text-orange-600 font-lexend">
                                    {userSalaryHistory.filter(p => p.status === 'pending').length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Pending Payments
                                </div>
                            </div>
                        </div>

                        {/* Filters and Controls */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700 font-lexend">
                                        Filter by status:
                                    </span>
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-lexend"
                                    >
                                        <option value="all">All</option>
                                        <option value="paid">Paid</option>
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-lexend">
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Salary History Table */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 font-lexend">
                                    Payment History
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lexend">
                                                Pay Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lexend">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lexend">
                                                Currency
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lexend">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-lexend">
                                                Transaction
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredHistory.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-900 font-lexend">
                                                            {new Date(payment.payday).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-semibold text-gray-900 font-lexend">
                                                        ${payment.amount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900 font-lexend">
                                                        {payment.stablecoin_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)} font-lexend`}>
                                                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {payment.transaction_hash ? (
                                                        <button
                                                            onClick={() => openBlockExplorer(payment.transaction_hash)}
                                                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-lexend"
                                                        >
                                                            <span>View</span>
                                                            <ExternalLink className="w-3 h-3" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-sm text-gray-500 font-lexend">
                                                            N/A
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredHistory.length === 0 && (
                                <div className="text-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 font-lexend mb-2">
                                        No salary history found
                                    </h3>
                                    <p className="text-gray-500 font-lexend">
                                        {selectedFilter === 'all'
                                            ? "You don't have any salary records yet."
                                            : `No ${selectedFilter} payments found.`
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Transactions */}
                        {userTransactions.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 font-lexend mb-4">
                                    Recent Transaction Details
                                </h2>

                                <div className="space-y-3">
                                    {userTransactions.slice(0, 3).map((transaction) => (
                                        <div key={transaction.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Download className="w-5 h-5 text-green-600" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 font-lexend">
                                                    {transaction.description}
                                                </div>
                                                <div className="text-sm text-gray-500 font-lexend">
                                                    {new Date(transaction.timestamp).toLocaleDateString()} •
                                                    TX: {transaction.transaction_hash?.slice(0, 10)}...
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="font-semibold text-green-600 font-lexend">
                                                    +{transaction.amount.toLocaleString()} {transaction.currency}
                                                </div>
                                                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                    {transaction.status}
                                                </div>
                                            </div>

                                            {transaction.transaction_hash && (
                                                <button
                                                    onClick={() => openBlockExplorer(transaction.transaction_hash)}
                                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryHistoryPage;
