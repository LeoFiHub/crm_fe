import { useState, useEffect, useCallback } from 'react';
import { walletManager } from '../services/wallet/walletManager';

export const useWallet = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletType, setWalletType] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);

    // Initialize wallet state
    useEffect(() => {
        const initWallet = async () => {
            const connected = walletManager.isConnected();
            const info = walletManager.getWalletInfo();

            if (connected && info) {
                setIsConnected(true);
                setWalletAddress(info.address);
                setWalletType(info.type);

                // Load balance
                try {
                    const balance = await walletManager.getBalance();
                    setBalance(balance);
                } catch (error) {
                    console.error('Failed to load balance:', error);
                }
            }
        };

        initWallet();
    }, []);

    // Load wallet balance
    const loadBalance = useCallback(async () => {
        try {
            const balance = await walletManager.getBalance();
            setBalance(balance);
        } catch (error) {
            console.error('Failed to load balance:', error);
        }
    }, []);

    // Connect wallet with auto-detection
    const connectWallet = useCallback(async (preferredType = null) => {
        // Prevent multiple calls while connecting
        if (isConnecting) {
            console.log('Already connecting, ignoring this call');
            return null;
        }
        
        setIsConnecting(true);
        setError(null);

        try {
            // Validate preferredType parameter
            if (preferredType && typeof preferredType !== 'string') {
                console.error('Invalid preferredType parameter:', preferredType);
                preferredType = null; // Reset to trigger auto-detection
            }

            // Auto-detect available wallets if no type specified
            if (!preferredType) {
                const availableWallets = walletManager.detectWallets();
                
                // Prefer MetaMask if available, otherwise use first supported wallet
                const metamaskWallet = availableWallets.find(w => w.type === 'metamask');
                const petraWallet = availableWallets.find(w => w.type === 'petra');
                
                if (metamaskWallet && metamaskWallet.available) {
                    preferredType = 'metamask';
                } else if (petraWallet && petraWallet.available) {
                    preferredType = 'petra';
                } else {
                    // No supported wallets found
                    throw new Error('No compatible wallet found. Please install MetaMask or Petra Wallet.');
                }
            }

            const result = await walletManager.connectWallet(preferredType);

            if (result) {
                setIsConnected(true);
                setWalletAddress(result.address);
                setWalletType(result.type);

                // Load balance
                await loadBalance();

                // Success notification
                console.log(`✅ Successfully connected to ${result.type} wallet: ${result.address}`);

                return result;
            }
        } catch (error) {
            setError(error.message);
            console.error('❌ Connection failed:', error.message);
        } finally {
            setIsConnecting(false);
        }

        return null;
    }, [loadBalance, isConnecting]);

    // Disconnect wallet
    const disconnectWallet = useCallback(async () => {
        try {
            await walletManager.disconnectWallet();
            setIsConnected(false);
            setWalletAddress(null);
            setWalletType(null);
            setBalance(null);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Disconnect failed:', error);
        }
    }, []);

    // Send transaction
    const sendTransaction = useCallback(async (to, amount, currency = 'ETH') => {
        try {
            setError(null);
            const result = await walletManager.sendTransaction(to, amount, currency);

            // Refresh balance after transaction
            if (walletAddress) {
                await loadBalance();
            }

            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }, [walletAddress, loadBalance]);

    // Sign message
    const signMessage = useCallback(async (message) => {
        try {
            setError(null);
            return await walletManager.signMessage(message);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }, []);

    // Get available wallets
    const getAvailableWallets = useCallback(() => {
        return walletManager.detectWallets();
    }, []);

    // Connect specific wallet type
    const connectSpecificWallet = useCallback(async (walletType) => {
        // Validate wallet type before attempting connection
        if (!walletManager.isSupportedWalletType(walletType)) {
            throw new Error(`Wallet type "${walletType}" is not supported. Supported types: ${walletManager.getSupportedWalletTypes().join(', ')}`);
        }
        return await connectWallet(walletType);
    }, [connectWallet]);

    // Refresh balance
    const refreshBalance = useCallback(async () => {
        await loadBalance();
    }, [loadBalance]);

    return {
        // State
        isConnected,
        walletAddress,
        walletType,
        isConnecting,
        error,
        balance,

        // Methods
        connectWallet,
        connectSpecificWallet,
        disconnectWallet,
        sendTransaction,
        signMessage,
        getAvailableWallets,
        refreshBalance,

        // Utils
        formatAddress: (address) => {
            if (!address) return '';
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
    };
};
