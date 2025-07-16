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

    // Connect wallet
    const connectWallet = useCallback(async (walletType = 'metamask') => {
        setIsConnecting(true);
        setError(null);

        try {
            const result = await walletManager.connectWallet(walletType);

            if (result) {
                setIsConnected(true);
                setWalletAddress(result.address);
                setWalletType(result.type);

                // Load balance
                await loadBalance();

                return result;
            }
        } catch (error) {
            setError(error.message);
            console.error('Connection failed:', error);
        } finally {
            setIsConnecting(false);
        }

        return null;
    }, [loadBalance]);

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
