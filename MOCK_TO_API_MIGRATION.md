# Mock to Real API Migration Guide

## 🎯 Tổng Quan

Tài liệu này mô tả chi tiết tất cả các chỗ mock trong hệ thống CRM và cách thay thế chúng bằng API calls thực tế để có một sản phẩm production-ready.

## 📂 Cấu Trúc Mock Hiện Tại

```
src/
├── utils/
│   └── mockData.js              # 🔄 MOCK - Main mock data file
├── services/
│   └── wallet/
│       └── walletManager.js     # 🔄 MOCK - Wallet operations
├── hooks/
│   └── useWallet.js            # 🔄 MOCK - Wallet state management
└── api/
    ├── user.js                 # ✅ REAL - API structure ready
    └── payroll.js              # ✅ REAL - API structure ready
```

## 🔄 Mock Components Cần Thay Thế

### 1. Authentication & User Management

#### 📍 File: `src/utils/mockData.js`

**Mock Functions to Replace:**

```javascript
// 🔄 MOCK FUNCTION
export const authenticateUser = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        const token = 'mock_jwt_token_' + user.id;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        return { user, token };
    }
    return null;
};
```

**🔧 Real API Replacement:**

```javascript
// ✅ REAL API IMPLEMENTATION
import { authenticateUser as apiAuthenticateUser } from '../api/user';

export const authenticateUser = async (email, password) => {
    try {
        const response = await apiAuthenticateUser({ email, password });
        const { user, token } = response.data;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        return { user, token };
    } catch (error) {
        console.error('Authentication failed:', error);
        return null;
    }
};
```

**🔧 Backend API Endpoint Needed:**

```javascript
// POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}

// Response:
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "fullName": "John Smith",
            "email": "user@example.com",
            "roles": "employee",
            "walletAddress": "0x...",
            // ... other user fields
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### 2. User Data Management

#### 📍 Current Mock Data

```javascript
// 🔄 MOCK DATA
export const mockUsers = [
    {
        id: 1,
        fullName: 'John Smith',
        email: 'employee@demo.com',
        // ... other fields
    }
];
```

**🔧 Real API Integration:**

```javascript
// ✅ ADD TO src/api/user.js
export const getCurrentUser = () => {
    const token = localStorage.getItem('auth_token');
    return axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateUserWallet = (walletAddress, walletType) => {
    const token = localStorage.getItem('auth_token');
    return axios.put('/api/user/wallet', 
        { walletAddress, walletType },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};
```

**🔧 Backend Endpoints Needed:**

```javascript
// GET /api/user/profile
// Response: User object

// PUT /api/user/wallet
{
    "walletAddress": "0x742d35Cc6634C0532925a3b8D23F4E",
    "walletType": "metamask"
}
```

### 3. Payroll Management

#### 📍 Current Mock

```javascript
// 🔄 MOCK DATA
export const mockPayrollSchedule = [
    {
        id: 1,
        id_employee: 1,
        amount: 5000,
        stablecoin_type: 'USDT',
        status: 'pending',
        // ...
    }
];
```

**🔧 Real API Integration:**

```javascript
// ✅ ENHANCE src/api/payroll.js

// Get payrolls for current user (Employee)
export const getMyPayrolls = () => {
    const token = localStorage.getItem('auth_token');
    return axios.get('/api/payrolls/my-payrolls', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Get all pending payrolls (Accounting)
export const getPendingPayrolls = () => {
    const token = localStorage.getItem('auth_token');
    return axios.get('/api/payrolls/pending', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Approve payroll (Accounting)
export const approvePayroll = (payrollId, transactionHash) => {
    const token = localStorage.getItem('auth_token');
    return axios.put(`/api/payrolls/${payrollId}/approve`, 
        { transactionHash },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};
```

### 4. Wallet Integration

#### 📍 File: `src/services/wallet/walletManager.js`

**🔄 Mock Functions to Replace:**

```javascript
// 🔄 MOCK FUNCTION
async getBalance() {
    // Mock data for demo
    return {
        ETH: '2.5',
        USDT: '1000.00',
        USDC: '500.00',
        DAI: '250.00'
    };
}

// 🔄 MOCK FUNCTION
async sendTransaction(to, amount, currency = 'ETH') {
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
```

**🔧 Real Implementation:**

```javascript
// ✅ REAL BLOCKCHAIN INTEGRATION
import { ethers } from 'ethers';

async getBalance() {
    if (!this.walletAddress) throw new Error('Wallet not connected');
    
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get ETH balance
        const ethBalance = await provider.getBalance(this.walletAddress);
        const ethFormatted = ethers.formatEther(ethBalance);
        
        // Get token balances (USDT, USDC, DAI)
        const tokenBalances = await this.getTokenBalances(provider);
        
        return {
            ETH: ethFormatted,
            ...tokenBalances
        };
    } catch (error) {
        console.error('Failed to get balance:', error);
        throw error;
    }
}

async sendTransaction(to, amount, currency = 'ETH') {
    if (!window.ethereum) throw new Error('Wallet not available');
    
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        let tx;
        if (currency === 'ETH') {
            // Send ETH
            tx = await signer.sendTransaction({
                to,
                value: ethers.parseEther(amount.toString())
            });
        } else {
            // Send Token (USDT, USDC, DAI)
            const tokenContract = this.getTokenContract(currency, signer);
            tx = await tokenContract.transfer(to, ethers.parseUnits(amount.toString(), 6)); // Assuming 6 decimals
        }
        
        return {
            hash: tx.hash,
            from: this.walletAddress,
            to,
            amount,
            currency,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
    }
}
```

### 5. Transaction History

#### 📍 Current Mock

```javascript
// 🔄 MOCK DATA
export const mockTransactions = [
    {
        id: 1,
        type: 'payroll',
        amount: 5000,
        currency: 'USDT',
        transaction_hash: '0x...',
        status: 'completed',
        // ...
    }
];
```

**🔧 Real API Integration:**

```javascript
// ✅ ADD TO src/api/transactions.js
import axios from 'axios';

export const getTransactionHistory = (filters = {}) => {
    const token = localStorage.getItem('auth_token');
    return axios.get('/api/transactions', {
        params: filters,
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createTransaction = (transactionData) => {
    const token = localStorage.getItem('auth_token');
    return axios.post('/api/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
```

### 6. Company Wallet Management

#### 📍 Current Mock

```javascript
// 🔄 MOCK DATA
export const mockCompanyWallet = {
    address: '0xCompanyWalletAddress123456789',
    balances: {
        ETH: '10.5',
        USDT: '75000.00',
        USDC: '25000.00',
        DAI: '15000.00'
    },
    totalValueUSD: 140200
};
```

**🔧 Real API Integration:**

```javascript
// ✅ ADD TO src/api/wallet.js
export const getCompanyWallet = () => {
    const token = localStorage.getItem('auth_token');
    return axios.get('/api/company/wallet', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const depositToCompany = (amount, currency, transactionHash) => {
    const token = localStorage.getItem('auth_token');
    return axios.post('/api/company/deposit', 
        { amount, currency, transactionHash },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};
```

## 🔧 Implementation Steps

### Step 1: Backend API Setup

**Required Endpoints:**

```bash
# Authentication
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

# User Management
GET    /api/user/profile
PUT    /api/user/profile
PUT    /api/user/wallet

# Payroll Management
GET    /api/payrolls
GET    /api/payrolls/my-payrolls
GET    /api/payrolls/pending
POST   /api/payrolls
PUT    /api/payrolls/:id/approve
PUT    /api/payrolls/:id/reject

# Transaction Management
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/:id

# Company Wallet
GET    /api/company/wallet
POST   /api/company/deposit
GET    /api/company/transactions

# Employee Management (Accounting only)
GET    /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
```

### Step 2: Frontend Migration

**Priority Order:**

1. **Authentication System** - Replace mock login
2. **User Profile Management** - Connect to real user data
3. **Payroll Data** - Replace mock payroll schedules
4. **Transaction History** - Connect to real blockchain data
5. **Wallet Integration** - Implement real blockchain calls
6. **Company Operations** - Connect accounting features

### Step 3: Environment Configuration

**🔧 Add to `.env`:**

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_BLOCKCHAIN_NETWORK=goerli # or mainnet
VITE_COMPANY_WALLET_ADDRESS=0x...

# Token Contract Addresses
VITE_USDT_CONTRACT=0x...
VITE_USDC_CONTRACT=0x...
VITE_DAI_CONTRACT=0x...
```

### Step 4: Update Components

**🔧 Files to Update:**

```javascript
// 1. Update all dashboard components
src/pages/employee/EmployeeDashboard.jsx
src/pages/accounting/AccountingDashboard.jsx

// 2. Update wallet components
src/components/wallet/WalletBalance.jsx
src/pages/employee/EmployeeWalletPage.jsx

// 3. Update payroll components
src/pages/payroll/PayrollList.jsx
src/components/payroll/PayrollTable.jsx

// 4. Update transaction components
src/pages/accounting/TransactionHistoryPage.jsx
```

## 📋 Migration Checklist

### Phase 1: Core API Integration

- [ ] Setup backend API endpoints
- [ ] Replace authentication mock with real API
- [ ] Connect user profile management
- [ ] Update environment configuration

### Phase 2: Data Integration

- [ ] Replace payroll mock data with API calls
- [ ] Implement real transaction history
- [ ] Connect employee management to backend
- [ ] Setup company wallet API integration

### Phase 3: Blockchain Integration

- [ ] Implement real wallet balance fetching
- [ ] Replace mock transactions with real blockchain calls
- [ ] Setup token contract interactions
- [ ] Implement transaction monitoring

### Phase 4: Production Readiness

- [ ] Add error handling and retry logic
- [ ] Implement loading states and optimistic updates
- [ ] Add transaction confirmation flows
- [ ] Setup monitoring and logging

## 🚨 Important Notes

### Security Considerations

1. **Never store private keys** - Always use wallet providers
2. **Validate all inputs** - Especially wallet addresses and amounts
3. **Implement rate limiting** - Prevent API abuse
4. **Use HTTPS** - For all API communications
5. **Validate JWT tokens** - On every API request

### Performance Optimization

1. **Cache wallet balances** - Avoid excessive blockchain calls
2. **Implement pagination** - For transaction history
3. **Use optimistic updates** - For better UX
4. **Debounce API calls** - Prevent excessive requests

### Error Handling

1. **Network failures** - Implement retry logic
2. **Wallet connection issues** - Provide clear error messages
3. **Transaction failures** - Handle gas estimation errors
4. **API errors** - Graceful fallback handling

---

## 🎯 Production Timeline

**Estimated Migration Time: 3-5 days**

- **Day 1**: Backend API setup và authentication
- **Day 2**: User và payroll data integration
- **Day 3**: Blockchain integration
- **Day 4**: Testing và bug fixes
- **Day 5**: Production deployment và monitoring

**Result**: Fully functional production-ready CRM with real blockchain integration!
