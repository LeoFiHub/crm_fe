import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Download, ExternalLink, Filter, Search, Calendar } from 'lucide-react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { getCurrentUser, mockTransactions } from '../../utils/mockData';

const TransactionHistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.role !== 'accounting') {
        navigate('/login');
        return null;
    }

    // Filter transactions based on selected filters
    const filteredTransactions = mockTransactions.filter(tx => {
        const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.transaction_hash.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || tx.type === selectedType;
        const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;

        let matchesDate = true;
        if (dateRange !== 'all') {
            const txDate = new Date(tx.timestamp);
            const now = new Date();
            switch (dateRange) {
                case 'today':
                    matchesDate = txDate.toDateString() === now.toDateString();
                    break;
                case 'week': {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchesDate = txDate >= weekAgo;
                    break;
                }
                case 'month': {
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    matchesDate = txDate >= monthAgo;
                    break;
                }
            }
        }

        return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case 'deposit':
                return { icon: '⬇️', color: 'text-green-600', bg: 'bg-green-100' };
            case 'payroll':
                return { icon: '💰', color: 'text-blue-600', bg: 'bg-blue-100' };
            case 'withdrawal':
                return { icon: '⬆️', color: 'text-red-600', bg: 'bg-red-100' };
            default:
                return { icon: '🔄', color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'failed':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const openBlockExplorer = (txHash) => {
        const url = `https://etherscan.io/tx/${txHash}`;
        window.open(url, '_blank');
    };

    const exportToCSV = () => {
        const headers = ['Date', 'Type', 'Description', 'Amount', 'Currency', 'Status', 'Transaction Hash'];
        const csvData = filteredTransactions.map(tx => [
            new Date(tx.timestamp).toLocaleDateString(),
            tx.type,
            tx.description,
            tx.amount,
            tx.currency,
            tx.status,
            tx.transaction_hash
        ]);

        const csvContent = [headers, ...csvData]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
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
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="mb-2 text-3xl font-bold text-zinc-900 font-lexend">
                                        Transaction History 📋
                                    </h1>
                                    <p className="text-zinc-600 font-lexend">
                                        Complete transaction log for company operations
                                    </p>
                                </div>

                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-indigo-500 rounded-lg hover:bg-indigo-600 font-lexend"
                                >
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 font-lexend">
                                    {mockTransactions.length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Total Transactions
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="text-2xl font-bold text-green-600 font-lexend">
                                    {mockTransactions.filter(tx => tx.type === 'deposit').length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Deposits
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600 font-lexend">
                                    {mockTransactions.filter(tx => tx.type === 'payroll').length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Payroll Payments
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600 font-lexend">
                                    {mockTransactions.filter(tx => tx.status === 'pending').length}
                                </div>
                                <div className="text-sm text-gray-600 font-lexend">
                                    Pending
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                                    />
                                </div>

                                {/* Type Filter */}
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                                >
                                    <option value="all">All Types</option>
                                    <option value="deposit">Deposits</option>
                                    <option value="payroll">Payroll</option>
                                    <option value="withdrawal">Withdrawals</option>
                                </select>

                                {/* Status Filter */}
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                                >
                                    <option value="all">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>

                                {/* Date Range */}
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 days</option>
                                    <option value="month">Last 30 days</option>
                                </select>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedType('all');
                                        setSelectedStatus('all');
                                        setDateRange('all');
                                    }}
                                    className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 font-lexend"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase font-lexend">
                                                Transaction
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTransactions.map((transaction) => {
                                            const typeInfo = getTypeIcon(transaction.type);
                                            return (
                                                <tr key={transaction.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeInfo.bg}`}>
                                                                <span className="text-sm">{typeInfo.icon}</span>
                                                            </div>
                                                            <span className={`text-sm font-medium ${typeInfo.color} font-lexend capitalize`}>
                                                                {transaction.type}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 font-lexend">
                                                            {transaction.description}
                                                        </div>
                                                        {transaction.employee_name && (
                                                            <div className="text-xs text-gray-500 font-lexend">
                                                                Employee: {transaction.employee_name}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`text-sm font-semibold font-lexend ${transaction.type === 'deposit' ? 'text-green-600' :
                                                            transaction.type === 'withdrawal' ? 'text-red-600' :
                                                                'text-blue-600'
                                                            }`}>
                                                            {transaction.type === 'withdrawal' ? '-' :
                                                                transaction.type === 'deposit' ? '+' : ''}
                                                            {transaction.amount.toLocaleString()} {transaction.currency}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3 text-gray-400" />
                                                            <span className="text-sm text-gray-900 font-lexend">
                                                                {new Date(transaction.timestamp).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-lexend">
                                                            {new Date(transaction.timestamp).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)} font-lexend`}>
                                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-xs text-gray-500">
                                                                {transaction.transaction_hash.slice(0, 6)}...{transaction.transaction_hash.slice(-4)}
                                                            </span>
                                                            <button
                                                                onClick={() => openBlockExplorer(transaction.transaction_hash)}
                                                                className="p-1 text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {filteredTransactions.length === 0 && (
                                <div className="py-12 text-center">
                                    <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-gray-900 font-lexend">
                                        No transactions found
                                    </h3>
                                    <p className="text-gray-500 font-lexend">
                                        Try adjusting your filters or search criteria.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Results Summary */}
                        {filteredTransactions.length > 0 && (
                            <div className="mt-4 text-sm text-center text-gray-500 font-lexend">
                                Showing {filteredTransactions.length} of {mockTransactions.length} transactions
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
