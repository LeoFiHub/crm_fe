import React from 'react';
import { walletManager } from '../../services/wallet/walletManager';

const WalletDebugComponent = () => {
    const testDetection = () => {
        console.log('=== Wallet Detection Test ===');

        // Test window objects
        console.log('window.ethereum exists:', !!window.ethereum);
        console.log('window.ethereum.isMetaMask:', !!window.ethereum?.isMetaMask);
        console.log('window.aptos exists:', !!window.aptos);

        if (window.aptos) {
            console.log('window.aptos object:', window.aptos);
        }

        // Test wallet detection
        const wallets = walletManager.detectWallets();
        console.log('Detected wallets:', wallets);

        // Test Petra-specific detection
        console.log('Petra detection result:', {
            windowExists: typeof window !== 'undefined',
            aptosExists: typeof window !== 'undefined' && !!window.aptos,
            aptosObject: typeof window !== 'undefined' ? window.aptos : 'N/A'
        });
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={testDetection}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
                🔍 Test Wallet Detection
            </button>
        </div>
    );
};

export default WalletDebugComponent;
