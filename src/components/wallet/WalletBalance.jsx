import React from 'react';
import { RefreshCw, Eye, EyeOff, TrendingUp, DollarSign } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

const WalletBalance = ({ showActions = true, compact = false }) => {
    const { balance, isConnected, refreshBalance, walletAddress } = useWallet();
    const [showBalance, setShowBalance] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refreshBalance();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    if (!isConnected || !balance) {
        return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="text-center text-gray-500">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Wallet not connected</p>
                </div>
            </div>
        );
    }

    const currencies = [
        { symbol: 'ETH', name: 'Ethereum', color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { symbol: 'USDT', name: 'Tether USD', color: 'text-green-600', bgColor: 'bg-green-50' },
        { symbol: 'USDC', name: 'USD Coin', color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { symbol: 'DAI', name: 'DAI Stablecoin', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    ];

    if (compact) {
        const totalUSD = Object.entries(balance).reduce((total, [symbol, amount]) => {
            if (symbol === 'ETH') return total + (parseFloat(amount) * 2400); // Mock ETH price
            return total + parseFloat(amount);
        }, 0);

        return (
            <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                    <div className="text-sm text-gray-500">Total Balance</div>
                    <div className="font-semibold text-gray-900">
                        ${showBalance ? totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '****'}
                    </div>
                </div>
                {showActions && (
                    <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                    >
                        {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Wallet Balance</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ''}
                    </p>
                </div>
                {showActions && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-50"
                        >
                            {!showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                )}
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {currencies.map(({ symbol, name, color, bgColor }) => (
                    <div key={symbol} className={`${bgColor} rounded-lg p-4`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className={`text-sm font-medium ${color}`}>
                                    {symbol}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {name}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-gray-900">
                                    {showBalance ? balance[symbol] || '0.00' : '****'}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {symbol}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Value */}
            <div className="pt-4 mt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                        Total Portfolio Value
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                        {showBalance ? (
                            `$${Object.entries(balance).reduce((total, [symbol, amount]) => {
                                if (symbol === 'ETH') return total + (parseFloat(amount) * 2400);
                                return total + parseFloat(amount);
                            }, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        ) : (
                            '$****'
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WalletBalance;
