# Petra Wallet Backend Integration Guide

## 🎯 Tổng Quan

Petra Wallet là ví chính thức của Aptos blockchain. Để tích hợp hoàn chỉnh Petra Wallet vào hệ thống CRM, backend cần hỗ trợ cả Ethereum (MetaMask) và Aptos (Petra) networks.

## 🔗 Blockchain Networks Support

### 1. **MetaMask - Ethereum Network**

- **Network**: Ethereum, Polygon, BSC, etc.
- **Token Standard**: ERC-20, ERC-721, ERC-1155
- **Integration**: Đã có trong `walletManager.js`

### 2. **Petra Wallet - Aptos Network**

- **Network**: Aptos Mainnet/Testnet/Devnet
- **Token Standard**: Aptos Coin (APT), Custom Tokens
- **Integration**: Đã thêm vào `walletManager.js`

## 📦 Frontend Dependencies

### Cần thêm vào package.json

```json
{
  "dependencies": {
    "@aptos-labs/wallet-adapter-core": "^4.0.0",
    "@aptos-labs/wallet-adapter-petra": "^3.0.0",
    "aptos": "^1.21.0"
  }
}
```

### Cài đặt

```bash
npm install @aptos-labs/wallet-adapter-core @aptos-labs/wallet-adapter-petra aptos
```

## 🔧 Backend API Modifications

### 1. Database Schema Updates

#### Users Table - Thêm support cho multiple wallets

```sql
ALTER TABLE users ADD COLUMN aptos_wallet_address VARCHAR(66) NULL;
ALTER TABLE users ADD COLUMN preferred_network ENUM('ethereum', 'aptos') DEFAULT 'ethereum';
```

#### Wallets Table - Mới

```sql
CREATE TABLE user_wallets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    wallet_address VARCHAR(66) NOT NULL,
    wallet_type ENUM('metamask', 'petra', 'other') NOT NULL,
    network_type ENUM('ethereum', 'aptos', 'polygon', 'bsc') NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_wallet (user_id, wallet_address, network_type)
);
```

#### Transactions Table - Cập nhật

```sql
ALTER TABLE transactions ADD COLUMN network_type ENUM('ethereum', 'aptos') NOT NULL DEFAULT 'ethereum';
ALTER TABLE transactions ADD COLUMN aptos_transaction_hash VARCHAR(66) NULL;
```

### 2. Environment Variables

```env
# Aptos Network Configuration
APTOS_NETWORK=mainnet  # mainnet, testnet, devnet
APTOS_RPC_URL=https://fullnode.mainnet.aptoslabs.com/v1
APTOS_FAUCET_URL=https://faucet.testnet.aptoslabs.com

# Company Aptos Wallet
COMPANY_APTOS_WALLET_ADDRESS=0x123...abc
COMPANY_APTOS_PRIVATE_KEY=your_aptos_private_key

# Multi-network support
DEFAULT_NETWORK=ethereum
SUPPORTED_NETWORKS=ethereum,aptos
```

### 3. Backend Service Updates

#### File: `src/services/aptosService.js` (Mới)

```javascript
const { AptosClient, AptosAccount, FaucetClient, TokenClient } = require('aptos');

class AptosService {
    constructor() {
        this.client = new AptosClient(process.env.APTOS_RPC_URL);
        this.faucetClient = new FaucetClient(
            process.env.APTOS_RPC_URL,
            process.env.APTOS_FAUCET_URL
        );
        this.tokenClient = new TokenClient(this.client);
        
        // Company wallet
        this.companyAccount = new AptosAccount(
            Buffer.from(process.env.COMPANY_APTOS_PRIVATE_KEY, 'hex')
        );
    }

    async getBalance(address) {
        try {
            const resources = await this.client.getAccountResources(address);
            const aptosCoinResource = resources.find(
                r => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
            );
            
            if (aptosCoinResource) {
                return parseInt(aptosCoinResource.data.coin.value) / 100000000; // Convert to APT
            }
            return 0;
        } catch (error) {
            console.error('Error getting Aptos balance:', error);
            throw error;
        }
    }

    async sendAPT(toAddress, amount) {
        try {
            const amountInOctas = Math.floor(amount * 100000000); // Convert APT to Octas
            
            const txnRequest = await this.client.generateTransaction(
                this.companyAccount.address(),
                {
                    function: '0x1::coin::transfer',
                    type_arguments: ['0x1::aptos_coin::AptosCoin'],
                    arguments: [toAddress, amountInOctas.toString()]
                }
            );

            const signedTxn = await this.client.signTransaction(this.companyAccount, txnRequest);
            const transactionRes = await this.client.submitTransaction(signedTxn);
            
            await this.client.waitForTransaction(transactionRes.hash);
            
            return {
                hash: transactionRes.hash,
                success: true
            };
        } catch (error) {
            console.error('Error sending APT:', error);
            throw error;
        }
    }

    async getTransactionDetails(txHash) {
        try {
            return await this.client.getTransactionByHash(txHash);
        } catch (error) {
            console.error('Error getting transaction details:', error);
            throw error;
        }
    }
}

module.exports = new AptosService();
```

#### File: `src/services/multiChainService.js` (Mới)

```javascript
const blockchainService = require('./blockchainService'); // Ethereum service
const aptosService = require('./aptosService');

class MultiChainService {
    async getBalance(address, network = 'ethereum') {
        switch (network.toLowerCase()) {
            case 'ethereum':
            case 'polygon':
            case 'bsc':
                return await blockchainService.getBalance(address);
            case 'aptos':
                return await aptosService.getBalance(address);
            default:
                throw new Error(`Unsupported network: ${network}`);
        }
    }

    async sendPayment(toAddress, amount, network = 'ethereum', currency = 'ETH') {
        switch (network.toLowerCase()) {
            case 'ethereum':
                return await blockchainService.sendPayment(toAddress, amount);
            case 'aptos':
                return await aptosService.sendAPT(toAddress, amount);
            default:
                throw new Error(`Unsupported network: ${network}`);
        }
    }

    async getTransactionDetails(txHash, network = 'ethereum') {
        switch (network.toLowerCase()) {
            case 'ethereum':
                return await blockchainService.getTransactionDetails(txHash);
            case 'aptos':
                return await aptosService.getTransactionDetails(txHash);
            default:
                throw new Error(`Unsupported network: ${network}`);
        }
    }

    getSupportedNetworks() {
        return ['ethereum', 'aptos', 'polygon', 'bsc'];
    }
}

module.exports = new MultiChainService();
```

### 4. API Endpoints Updates

#### POST `/api/users/:id/wallet` - Cập nhật để hỗ trợ multiple wallets

```javascript
// Request Body
{
    "walletAddress": "0x123...abc",
    "walletType": "petra",
    "networkType": "aptos",
    "isPrimary": true
}

// Response
{
    "success": true,
    "message": "Petra wallet added successfully",
    "data": {
        "walletId": 1,
        "walletAddress": "0x123...abc",
        "networkType": "aptos"
    }
}
```

#### GET `/api/wallet/balance/:address` - Multi-network

```javascript
// Query Params: ?network=aptos
// Response
{
    "success": true,
    "data": {
        "address": "0x123...abc",
        "balance": 150.75,
        "currency": "APT",
        "network": "aptos",
        "balanceUSD": 1200.50
    }
}
```

#### POST `/api/payroll/schedules/:id/pay` - Multi-network payment

```javascript
// Request Body
{
    "fromWalletAddress": "0x456...def",
    "network": "aptos",
    "amount": 100.5,
    "currency": "APT"
}

// Response
{
    "success": true,
    "data": {
        "transactionHash": "0x789...ghi",
        "network": "aptos",
        "status": "pending"
    }
}
```

### 5. Controller Updates

#### File: `src/controllers/walletController.js`

```javascript
const multiChainService = require('../services/multiChainService');

const getWalletBalance = async (req, res) => {
    try {
        const { address } = req.params;
        const { network = 'ethereum' } = req.query;

        const balance = await multiChainService.getBalance(address, network);
        
        res.json({
            success: true,
            data: {
                address,
                balance,
                network,
                currency: network === 'aptos' ? 'APT' : 'ETH'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const addUserWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const { walletAddress, walletType, networkType, isPrimary } = req.body;

        // Validation
        if (!walletAddress || !walletType || !networkType) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Save to database
        const walletData = await UserWallet.create({
            userId: id,
            walletAddress,
            walletType,
            networkType,
            isPrimary: isPrimary || false
        });

        res.json({
            success: true,
            message: `${walletType} wallet added successfully`,
            data: walletData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
```

## 📋 Implementation Timeline

### Phase 1: Database Updates (1 day)

- [ ] Add Aptos wallet columns to users table
- [ ] Create user_wallets table
- [ ] Update transactions table for multi-network
- [ ] Database migration scripts

### Phase 2: Backend Services (2 days)

- [ ] Implement AptosService
- [ ] Create MultiChainService
- [ ] Update existing controllers
- [ ] Add new API endpoints

### Phase 3: Frontend Integration (1 day)

- [ ] Install Aptos dependencies
- [ ] Test Petra wallet connection
- [ ] Update UI for multi-wallet support
- [ ] Testing and debugging

### Phase 4: Testing & Documentation (1 day)

- [ ] End-to-end testing
- [ ] API documentation updates
- [ ] User guide for wallet switching

## 🔒 Security Considerations

### 1. Private Key Management

```javascript
// Sử dụng encrypted storage hoặc KMS cho production
const crypto = require('crypto');

const encryptPrivateKey = (privateKey, password) => {
    const cipher = crypto.createCipher('aes-256-cbc', password);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
```

### 2. Transaction Validation

```javascript
const validateAptosTransaction = async (txHash) => {
    const txDetails = await aptosService.getTransactionDetails(txHash);
    return {
        isValid: txDetails.success,
        amount: txDetails.payload?.arguments?.[1],
        recipient: txDetails.payload?.arguments?.[0]
    };
};
```

## 🚨 Important Notes

1. **Network Detection**: Frontend tự động detect MetaMask (Ethereum) hoặc Petra (Aptos)
2. **Fallback**: Nếu không có ví nào, hiện link download cả 2
3. **Multi-wallet**: User có thể kết nối cả 2 ví cùng lúc
4. **Primary Wallet**: User chọn ví chính để receive payments
5. **Currency Conversion**: Backend cần API để convert APT ↔ ETH ↔ USD

## 📞 Support Links

- **MetaMask**: <https://metamask.io/download/>
- **Petra Wallet**: <https://petra.app/>
- **Aptos Documentation**: <https://aptos.dev/>
- **Aptos SDK**: <https://www.npmjs.com/package/aptos>

---

**Tóm tắt**: Petra Wallet integration cần backend hỗ trợ Aptos network song song với Ethereum. Frontend đã được cập nhật để auto-detect và connect cả 2 ví.
