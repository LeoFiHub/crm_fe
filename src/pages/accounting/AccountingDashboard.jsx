import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Wallet, CreditCard, Activity, LogOut, TrendingUp, DollarSign } from 'lucide-react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import WalletBalance from '../../components/wallet/WalletBalance';
import { useAuth } from '../../contexts/AuthContext';
import { mockPayrollSchedule, mockCompanyWallet } from '../../utils/mockData';
import { getPayrollsByStatus } from '../../api/payroll';
import { getEmployees } from '../../api/user';

const AccountingDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { user: currentUser, logout } = useAuth();
    const [pendingPayrolls, setPendingPayrolls] = useState([]);
    const [employees, setEmployees] = useState([]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Calculate stats from mock data
    // const pendingPayrolls = mockPayrollSchedule.filter(p => p.status === 'pending');
    useEffect(() => {
        const fetchData = async () => {
            const pending = await getPayrollsByStatus('pending');
            setPendingPayrolls(pending.data.data);
        };
        fetchData();
    }, []);

    // Get all employees
    useEffect(() => {
        const fetchData = async () => {
            const pending = await getPayrollsByStatus('pending');
            setPendingPayrolls(pending.data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const employees = await getEmployees();
            setEmployees(employees.data.data);
        };
        fetchData();
    }, []);

    const totalPendingAmount = pendingPayrolls.reduce((sum, p) => sum + p.amount, 0);
    const totalEmployees = employees.length;

    const quickActions = [
        {
            icon: Users,
            title: 'Payroll Approval',
            description: `${pendingPayrolls.length} pending approvals`,
            onClick: () => navigate('/accounting/payroll-approval'),
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            badge: pendingPayrolls.length
        },
        {
            icon: CreditCard,
            title: 'Deposit Funds',
            description: 'Add funds to company wallet',
            onClick: () => navigate('/accounting/deposit'),
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: Wallet,
            title: 'Company Wallet',
            description: 'Manage company crypto wallet',
            onClick: () => navigate('/accounting/company-wallet'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: Activity,
            title: 'Transaction History',
            description: 'View all transactions',
            onClick: () => navigate('/accounting/transactions'),
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
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
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-zinc-900 font-lexend">
                                        Accounting Dashboard 📊
                                    </h1>
                                    <p className="mt-2 text-zinc-600 font-lexend">
                                        {currentUser?.fullName} • Accounting Manager
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 transition-colors border border-red-200 rounded-lg hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 font-lexend">
                                            {totalEmployees}
                                        </div>
                                        <div className="text-sm text-gray-600 font-lexend">
                                            Total Employees
                                        </div>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600 font-lexend">
                                            {pendingPayrolls.length}
                                        </div>
                                        <div className="text-sm text-gray-600 font-lexend">
                                            Pending Approvals
                                        </div>
                                    </div>
                                    <Activity className="w-8 h-8 text-orange-500" />
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600 font-lexend">
                                            ${totalPendingAmount.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600 font-lexend">
                                            Pending Amount
                                        </div>
                                    </div>
                                    <DollarSign className="w-8 h-8 text-green-500" />
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600 font-lexend">
                                            ${mockCompanyWallet.totalValueUSD.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600 font-lexend">
                                            Company Balance
                                        </div>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Main Dashboard Grid */}
                        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                            {/* Company Wallet Overview */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-zinc-900 font-lexend">
                                    Company Wallet
                                </h2>

                                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-900 font-lexend">Balance Overview</h3>
                                        <Wallet className="w-5 h-5 text-gray-500" />
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(mockCompanyWallet.balances).map(([currency, amount]) => (
                                            <div key={currency} className="flex items-center justify-between">
                                                <span className="text-gray-600 font-lexend">{currency}</span>
                                                <span className="font-semibold text-gray-900 font-lexend">
                                                    {amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900 font-lexend">Total Value</span>
                                            <span className="text-xl font-bold text-green-600 font-lexend">
                                                ${mockCompanyWallet.totalValueUSD.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pending Payrolls */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-zinc-900 font-lexend">
                                    Pending Payrolls
                                </h2>

                                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                                    <div className="space-y-4">
                                        {pendingPayrolls.slice(0, 3).map((payroll) => (
                                            <div key={payroll.id} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                                                {/* Uncomment and adjust if you have employee avatar: <img src={payroll.employee?.avatar} alt={payroll.employee?.fullName} className="object-cover w-10 h-10 rounded-full" /> */}
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 font-lexend">
                                                        {payroll.employee?.fullName || ''}
                                                    </div>
                                                    <div className="text-sm text-gray-500 font-lexend">
                                                        {payroll.amount?.toLocaleString('vi-VN')} {payroll.stablecoin_type}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-orange-600 font-lexend">
                                                    {payroll.payday}
                                                </div>
                                            </div>
                                        ))}

                                        {pendingPayrolls.length > 3 && (
                                            <div className="text-center">
                                                <button
                                                    onClick={() => navigate('/accounting/payroll-approval')}
                                                    className="text-sm text-indigo-600 font-lexend hover:underline"
                                                >
                                                    View all {pendingPayrolls.length} pending payrolls
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-semibold text-zinc-900 font-lexend">
                                Quick Actions
                            </h2>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className="relative p-6 text-left transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
                                    >
                                        {action.badge && (
                                            <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                                                {action.badge}
                                            </div>
                                        )}

                                        <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                            <action.icon className={`w-6 h-6 ${action.color}`} />
                                        </div>
                                        <h3 className="mb-2 font-semibold text-gray-900 font-lexend">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-lexend">
                                            {action.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-zinc-900 font-lexend">
                                    Recent Transactions
                                </h2>
                                <button
                                    onClick={() => navigate('/accounting/transactions')}
                                    className="text-sm text-indigo-600 font-lexend hover:underline"
                                >
                                    View All
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 font-lexend">
                                            Salary payment to Sarah Wilson
                                        </div>
                                        <div className="text-xs text-gray-500 font-lexend">
                                            Jan 15, 2025 • $4,500 USDT
                                        </div>
                                    </div>
                                    <div className="text-sm text-green-600 font-lexend">
                                        Completed
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 font-lexend">
                                            Company fund deposit
                                        </div>
                                        <div className="text-xs text-gray-500 font-lexend">
                                            Jan 10, 2025 • $50,000 USDT
                                        </div>
                                    </div>
                                    <div className="text-sm text-blue-600 font-lexend">
                                        Completed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountingDashboard;
