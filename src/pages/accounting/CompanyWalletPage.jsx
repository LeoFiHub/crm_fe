import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Plus, RefreshCw, TrendingUp, AlertTriangle, Eye, EyeOff } from 'lucide-react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import WalletConnector from '../../components/wallet/WalletConnector';
import { getCurrentUser, mockCompanyWallet } from '../../utils/mockData';
import { useWallet } from '../../hooks/useWallet';

const CompanyWalletPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const { isConnected } = useWallet();

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    if (!currentUser || currentUser.role !== 'accounting') {
        navigate('/login');
        return null;
    }

    const currencies = [
        {
            symbol: 'ETH',
            name: 'Ethereum',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            icon: '⟠'
        },
        {
            symbol: 'USDT',
            name: 'Tether USD',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            icon: '₮'
        },
        {
            symbol: 'USDC',
            name: 'USD Coin',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            icon: '$'
        },
        {
            symbol: 'DAI',
            name: 'DAI Stablecoin',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            icon: '◈'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: 'deposit',
            description: 'Fund deposit from external wallet',
            amount: 50000,
            currency: 'USDT',
            timestamp: '2025-01-10T10:30:00Z',
            status: 'completed'
        },
        {
            id: 2,
            type: 'payroll',
            description: 'Salary payment to Sarah Wilson',
            amount: -4500,
            currency: 'USDT',
            timestamp: '2025-01-15T12:00:00Z',
            status: 'completed'
        },
        {
            id: 3,
            type: 'gas_fee',
            description: 'Transaction fees',
            amount: -25,
            currency: 'ETH',
            timestamp: '2025-01-15T12:01:00Z',
            status: 'completed'
        }
    ];

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
                                        Company Wallet 🏦
                                    </h1>
                                    <p className="text-zinc-600 font-lexend">
                                        Manage company crypto assets and wallet connections
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowBalance(!showBalance)}
                                        className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100"
                                    >
                                        {!showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>

                                    <button
                                        onClick={handleRefresh}
                                        disabled={isRefreshing}
                                        className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Wallet Connection Status */}
                        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-6 h-6 text-indigo-500" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 font-lexend">
                                            Main Company Wallet
                                        </h3>
                                        <p className="text-sm text-gray-500 font-lexend">
                                            {mockCompanyWallet.address}
                                        </p>
                                    </div>
                                </div>

                                {isConnected ? (
                                    <div className="flex items-center gap-2 px-3 py-2 border border-green-200 rounded-lg bg-green-50">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-green-700 font-lexend">Connected</span>
                                    </div>
                                ) : (
                                    <WalletConnector className="text-sm" />
                                )}
                            </div>
                        </div>

                        {/* Balance Overview */}
                        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                            {/* Total Portfolio Value */}
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 font-lexend">
                                        Total Portfolio Value
                                    </h2>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>

                                <div className="mb-2 text-3xl font-bold text-gray-900 font-lexend">
                                    {showBalance ? `$${mockCompanyWallet.totalValueUSD.toLocaleString()}` : '$****'}
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-green-600 font-lexend">+5.2%</span>
                                    <span className="text-gray-500 font-lexend">vs last month</span>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 font-lexend">
                                    Quick Actions
                                </h2>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate('/accounting/deposit')}
                                        className="flex items-center w-full gap-3 p-3 transition-colors border border-indigo-200 rounded-lg bg-indigo-50 hover:bg-indigo-100"
                                    >
                                        <Plus className="w-5 h-5 text-indigo-600" />
                                        <span className="font-medium text-indigo-700 font-lexend">Deposit Funds</span>
                                    </button>

                                    <button
                                        onClick={() => navigate('/accounting/payroll-approval')}
                                        className="flex items-center w-full gap-3 p-3 transition-colors border border-green-200 rounded-lg bg-green-50 hover:bg-green-100"
                                    >
                                        <Wallet className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-green-700 font-lexend">Process Payroll</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Currency Balances */}
                        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 font-lexend">
                                Asset Breakdown
                            </h2>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {currencies.map(({ symbol, name, color, bgColor, icon }) => (
                                    <div key={symbol} className={`${bgColor} rounded-lg p-4`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{icon}</span>
                                                <div className={`text-sm font-medium ${color} font-lexend`}>
                                                    {symbol}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-1 text-xl font-bold text-gray-900 font-lexend">
                                            {showBalance ? mockCompanyWallet.balances[symbol] || '0.00' : '****'}
                                        </div>

                                        <div className="text-xs text-gray-500 font-lexend">
                                            {name}
                                        </div>

                                        {/* Mock USD value */}
                                        <div className="mt-2 text-sm text-gray-600 font-lexend">
                                            ≈ ${showBalance ? (
                                                symbol === 'ETH'
                                                    ? (parseFloat(mockCompanyWallet.balances[symbol]) * 2400).toLocaleString()
                                                    : parseFloat(mockCompanyWallet.balances[symbol]).toLocaleString()
                                            ) : '****'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Alerts */}
                        <div className="p-4 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-yellow-800 font-lexend">
                                        Security Recommendations
                                    </h3>
                                    <ul className="mt-2 space-y-1 text-sm text-yellow-700 font-lexend">
                                        <li>• Enable multi-signature for transactions above $10,000</li>
                                        <li>• Regular backup of wallet recovery phrases</li>
                                        <li>• Monitor for unusual transaction patterns</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 font-lexend">
                                    Recent Activity
                                </h2>
                                <button
                                    onClick={() => navigate('/accounting/transactions')}
                                    className="text-sm text-indigo-600 font-lexend hover:underline"
                                >
                                    View All
                                </button>
                            </div>

                            <div className="space-y-3">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'deposit' ? 'bg-green-100' :
                                                activity.type === 'payroll' ? 'bg-blue-100' : 'bg-orange-100'
                                            }`}>
                                            {activity.type === 'deposit' ? (
                                                <Plus className={`w-5 h-5 text-green-600`} />
                                            ) : activity.type === 'payroll' ? (
                                                <Wallet className={`w-5 h-5 text-blue-600`} />
                                            ) : (
                                                <TrendingUp className={`w-5 h-5 text-orange-600`} />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 font-lexend">
                                                {activity.description}
                                            </div>
                                            <div className="text-sm text-gray-500 font-lexend">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className={`font-semibold font-lexend ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {activity.amount > 0 ? '+' : ''}
                                                {Math.abs(activity.amount).toLocaleString()} {activity.currency}
                                            </div>
                                            <div className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                                                {activity.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyWalletPage;
