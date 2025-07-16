// Unified wallet manager for MetaMask and other wallets
export class WalletManager {
    constructor() {
        this.connectedWallet = null;
        this.walletAddress = null;
        this.isConnecting = false;
    }

    // Detect available wallets
    detectWallets() {
        const wallets = [];

        // Check for MetaMask
        if (typeof window !== 'undefined' && window.ethereum?.isMetaMask) {
            wallets.push({
                name: 'MetaMask',
                type: 'metamask',
                icon: '🦊',
                available: true
            });
        }

        // Check for Petra Wallet (Aptos)
        if (typeof window !== 'undefined' && window.aptos) {
            wallets.push({
                name: 'Petra Wallet',
                type: 'petra',
                icon: '🔴',
                available: true
            });
        }

        // Only return supported wallet types
        return wallets;
    }

    // Connect to wallet
    async connectWallet(walletType = 'metamask') {
        if (this.isConnecting) {
            console.log('Already connecting to a wallet, please wait...');
            return null;
        }

        // Check if already connected to this wallet type
        const existingConnection = this.getWalletInfo();
        if (existingConnection && existingConnection.type === walletType) {
            console.log('Already connected to', walletType);
            return {
                address: existingConnection.address,
                type: existingConnection.type,
                chainId: existingConnection.chainId || existingConnection.network
            };
        }

        // Validate wallet type
        const supportedTypes = ['metamask', 'petra'];
        if (typeof walletType !== 'string' || !supportedTypes.includes(walletType)) {
            throw new Error(`Unsupported wallet type: ${walletType}. Supported types: ${supportedTypes.join(', ')}`);
        }

        this.isConnecting = true;

        try {
            switch (walletType) {
                case 'metamask':
                    return await this.connectMetaMask();
                case 'petra':
                    return await this.connectPetra();
                default:
                    throw new Error('Unsupported wallet type');
            }
        } catch (error) {
            console.error('Wallet connection failed:', error);
            throw error;
        } finally {
            this.isConnecting = false;
        }
    }

    // Connect MetaMask
    async connectMetaMask() {
        if (!window.ethereum?.isMetaMask) {
            throw new Error('MetaMask is not installed');
        }

        try {
            // First, check if already connected
            let accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });

            // If no accounts, request permission
            if (accounts.length === 0) {
                accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
            }

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            const address = accounts[0];
            this.walletAddress = address;
            this.connectedWallet = 'metamask';

            // Get network info
            const chainId = await window.ethereum.request({
                method: 'eth_chainId',
            });

            // Save to localStorage
            this.saveWalletInfo({
                address,
                type: 'metamask',
                chainId,
                connectedAt: new Date().toISOString()
            });

            return {
                address,
                type: 'metamask',
                chainId
            };

        } catch (error) {
            console.error('MetaMask connection error:', error);

            // Handle specific MetaMask errors
            if (error.code === -32002) {
                throw new Error('MetaMask is already processing a connection request. Please check your MetaMask extension.');
            }

            if (error.code === 4001) {
                throw new Error('User rejected the connection request.');
            }

            throw new Error(`Failed to connect MetaMask: ${error.message}`);
        }
    }

    // Connect Petra Wallet (Aptos)
    async connectPetra() {
        if (!window.aptos) {
            throw new Error('Petra Wallet is not installed');
        }

        try {
            // Request connection to Petra
            const response = await window.aptos.connect();

            if (!response || !response.address) {
                throw new Error('Failed to get account from Petra Wallet');
            }

            const address = response.address;
            this.walletAddress = address;
            this.connectedWallet = 'petra';

            // Get network info (Aptos)
            const network = await window.aptos.network();

            // Save to localStorage
            this.saveWalletInfo({
                address,
                type: 'petra',
                network: network || 'mainnet',
                connectedAt: new Date().toISOString()
            });

            return {
                address,
                type: 'petra',
                network: network || 'mainnet'
            };

        } catch (error) {
            console.error('Petra Wallet connection error:', error);
            throw new Error(`Failed to connect Petra Wallet: ${error.message}`);
        }
    }

    // Disconnect wallet
    async disconnectWallet() {
        this.connectedWallet = null;
        this.walletAddress = null;

        // Clear localStorage
        localStorage.removeItem('wallet_info');
        localStorage.removeItem('wallet_connected');

        return true;
    }

    // Get current wallet info
    getWalletInfo() {
        const saved = localStorage.getItem('wallet_info');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Error parsing wallet info:', error);
            }
        }
        return null;
    }

    // Save wallet info to localStorage
    saveWalletInfo(info) {
        localStorage.setItem('wallet_info', JSON.stringify(info));
        localStorage.setItem('wallet_connected', 'true');
    }

    // Check if wallet is connected
    isConnected() {
        return localStorage.getItem('wallet_connected') === 'true' && this.getWalletInfo();
    }

    // Get wallet balance (mock implementation with sample data)
    async getBalance() {
        // Mock data for demo - address parameter not needed for mock
        return {
            ETH: '2.5',
            USDT: '1000.00',
            USDC: '500.00',
            DAI: '250.00'
        };
    }

    // Send transaction (mock implementation)
    async sendTransaction(to, amount, currency = 'ETH') {
        if (!this.isConnected()) {
            throw new Error('Wallet not connected');
        }

        // Mock transaction for demo
        const txHash = '0x' + Math.random().toString(16).substr(2, 64);

        return {
            hash: txHash,
            from: this.walletAddress,
            to,
            amount,
            currency,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
    }

    // Sign message for authentication
    async signMessage(message) {
        if (!window.ethereum) {
            throw new Error('Wallet not available');
        }

        try {
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, this.walletAddress],
            });

            return signature;
        } catch (error) {
            console.error('Message signing failed:', error);
            throw error;
        }
    }

    // Setup event listeners
    setupEventListeners() {
        if (!window.ethereum) return;

        // Account changed
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                this.disconnectWallet();
            } else {
                this.walletAddress = accounts[0];
                const info = this.getWalletInfo();
                if (info) {
                    info.address = accounts[0];
                    this.saveWalletInfo(info);
                }
            }
        });

        // Chain changed
        window.ethereum.on('chainChanged', (chainId) => {
            const info = this.getWalletInfo();
            if (info) {
                info.chainId = chainId;
                this.saveWalletInfo(info);
            }
            // Reload page on chain change
            window.location.reload();
        });
    }

    // Get supported wallet types
    getSupportedWalletTypes() {
        return ['metamask', 'petra'];
    }

    // Check if wallet type is supported
    isSupportedWalletType(type) {
        return this.getSupportedWalletTypes().includes(type);
    }
}

// Create singleton instance
export const walletManager = new WalletManager();

// Auto-setup event listeners
if (typeof window !== 'undefined') {
    walletManager.setupEventListeners();
}
