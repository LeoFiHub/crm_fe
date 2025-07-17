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
        connectSpecificWallet,
        disconnectWallet,
        getAvailableWallets,
        formatAddress
    } = useWallet();

    const [showWalletModal, setShowWalletModal] = useState(false);

    const handleConnect = async (type = 'metamask') => {
        const result = await connectSpecificWallet(type);
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

    // console.log('WalletConnector - Available wallets:', availableWallets);

    if (isConnected) {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <div className="flex items-center gap-2 px-3 py-2 border border-green-200 rounded-lg bg-green-50">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                        {walletType === 'metamask' ? '🦊' : walletType === 'petra' ? '🔴' : '💰'} {formatAddress(walletAddress)}
                    </span>
                </div>
                <button
                    onClick={handleDisconnect}
                    className="px-3 py-2 text-sm font-medium text-red-600 transition-colors border border-red-200 rounded-lg hover:bg-red-50"
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
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Wallet Selection Modal */}
            {showWalletModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 mx-4 bg-white rounded-xl">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Connect Your Wallet
                        </h3>

                        <div className="space-y-3">
                            {/* Always show both wallets - installed and not installed */}
                            {[
                                {
                                    name: 'MetaMask',
                                    type: 'metamask',
                                    icon: '🦊',
                                    available: availableWallets.some(w => w.type === 'metamask'),
                                    downloadUrl: 'https://metamask.io/download/'
                                },
                                {
                                    name: 'Petra Wallet',
                                    type: 'petra',
                                    icon: '🔴',
                                    available: availableWallets.some(w => w.type === 'petra'),
                                    downloadUrl: 'https://petra.app/'
                                }
                            ].map((wallet) => (
                                <button
                                    key={wallet.type}
                                    onClick={() => wallet.available ? handleConnect(wallet.type) : window.open(wallet.downloadUrl, '_blank')}
                                    disabled={isConnecting}
                                    className="flex items-center w-full gap-3 p-4 transition-colors border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="text-2xl">{wallet.icon}</span>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-gray-900">
                                            {wallet.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {wallet.available ? 'Click to connect' : 'Click to install'}
                                        </div>
                                    </div>
                                    {wallet.available ? (
                                        <div className="text-sm font-medium text-green-500">Ready</div>
                                    ) : (
                                        <div className="text-sm font-medium text-blue-500">Install</div>
                                    )}
                                    {isConnecting && (
                                        <Loader2 className="w-4 h-4 ml-auto animate-spin" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowWalletModal(false)}
                                className="px-4 py-2 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
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
