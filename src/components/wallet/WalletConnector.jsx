import React, { useState } from 'react';
import { Wallet, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

const WalletConnector = ({ onConnect, onDisconnect, className = '' }) => {
    const {
        isConnected,
        walletAddress,
        walletType,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        getAvailableWallets,
        formatAddress
    } = useWallet();

    const [showWalletModal, setShowWalletModal] = useState(false);

    const handleConnect = async (type = 'metamask') => {
        const result = await connectWallet(type);
        if (result && onConnect) {
            onConnect(result);
        }
        setShowWalletModal(false);
    };

    const handleDisconnect = async () => {
        await disconnectWallet();
        if (onDisconnect) {
            onDisconnect();
        }
    };

    const availableWallets = getAvailableWallets();

    if (isConnected) {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                        {walletType === 'metamask' ? '🦊' : '💰'} {formatAddress(walletAddress)}
                    </span>
                </div>
                <button
                    onClick={handleDisconnect}
                    className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setShowWalletModal(true)}
                disabled={isConnecting}
                className={`flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                {isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Wallet className="w-4 h-4" />
                )}
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>

            {/* Error display */}
            {error && (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Wallet Selection Modal */}
            {showWalletModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Connect Your Wallet
                        </h3>

                        <div className="space-y-3">
                            {availableWallets.length > 0 ? (
                                availableWallets.map((wallet) => (
                                    <button
                                        key={wallet.type}
                                        onClick={() => handleConnect(wallet.type)}
                                        disabled={!wallet.available || isConnecting}
                                        className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="text-2xl">{wallet.icon}</span>
                                        <div className="text-left">
                                            <div className="font-medium text-gray-900">
                                                {wallet.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {wallet.available ? 'Available' : 'Not installed'}
                                            </div>
                                        </div>
                                        {isConnecting && (
                                            <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                                        No Wallets Found
                                    </h4>
                                    <p className="text-gray-500 mb-4">
                                        Please install MetaMask or another compatible wallet.
                                    </p>
                                    <a
                                        href="https://metamask.io/download/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        🦊 Install MetaMask
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowWalletModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WalletConnector;
