# Backend API Requirements for CRM System

## 🎯 Tổng Quan Dự Án

Dự án CRM với 2 role chính: **Employee** và **Accounting**, tích hợp ví crypto (MetaMask/Petra) cho quản lý payroll blockchain.

**Tech Stack Frontend:**

- React 18 + Vite
- Tailwind CSS
- ethers.js v6.15.0
- @metamask/sdk
- react-router-dom v6

**Yêu Cầu Backend:**

- Node.js + Express.js
- MongoDB/PostgreSQL
- JWT Authentication
- Blockchain Integration (Ethereum/Aptos)
- RESTful API

## 🏗️ Database Schema Requirements

### 1. Users Table

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('employee', 'accounting') NOT NULL,
    employee_id VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    position VARCHAR(100),
    wallet_address VARCHAR(42),
    base_salary DECIMAL(15,2),
    hourly_rate DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Company Wallet Table

```sql
CREATE TABLE company_wallet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    wallet_name VARCHAR(100) NOT NULL,
    balance DECIMAL(20,8) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'ETH',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Payroll Schedules Table

```sql
CREATE TABLE payroll_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    base_amount DECIMAL(15,2) NOT NULL,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    overtime_amount DECIMAL(15,2) DEFAULT 0,
    bonus DECIMAL(15,2) DEFAULT 0,
    deductions DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    status ENUM('pending', 'approved', 'paid', 'cancelled') DEFAULT 'pending',
    approved_by INT NULL,
    approved_at TIMESTAMP NULL,
    transaction_hash VARCHAR(66) NULL,
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);
```

### 4. Transactions Table

```sql
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_hash VARCHAR(66) UNIQUE NOT NULL,
    from_address VARCHAR(42) NOT NULL,
    to_address VARCHAR(42) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    transaction_type ENUM('payroll', 'bonus', 'refund', 'deposit') NOT NULL,
    status ENUM('pending', 'confirmed', 'failed') DEFAULT 'pending',
    block_number BIGINT NULL,
    gas_used BIGINT NULL,
    gas_price DECIMAL(20,8) NULL,
    payroll_id INT NULL,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    FOREIGN KEY (payroll_id) REFERENCES payroll_schedules(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔌 API Endpoints Required

### 1. Authentication APIs

#### POST `/api/auth/login`

```javascript
// Request Body
{
    "email": "john.doe@company.com",
    "password": "password123"
}

// Response
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "email": "john.doe@company.com",
            "fullName": "John Doe",
            "role": "employee",
            "employeeId": "EMP001",
            "department": "Engineering",
            "position": "Senior Developer",
            "walletAddress": "0x123...abc",
            "baseSalary": 5000.00
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

#### POST `/api/auth/logout`

```javascript
// Headers: Authorization: Bearer <token>
// Response
{
    "success": true,
    "message": "Logged out successfully"
}
```

#### GET `/api/auth/profile`

```javascript
// Headers: Authorization: Bearer <token>
// Response: Same as login user data
```

### 2. User Management APIs

#### GET `/api/users`

```javascript
// Headers: Authorization: Bearer <token>
// Query Params: ?role=employee&department=Engineering&page=1&limit=10

// Response
{
    "success": true,
    "data": {
        "users": [...],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 25,
            "totalPages": 3
        }
    }
}
```

#### PUT `/api/users/:id/wallet`

```javascript
// Request Body
{
    "walletAddress": "0x123...abc"
}

// Response
{
    "success": true,
    "message": "Wallet address updated successfully"
}
```

### 3. Payroll Management APIs

#### GET `/api/payroll/schedules`

```javascript
// Headers: Authorization: Bearer <token>
// Query Params: ?status=pending&userId=1&month=2025-01

// Response
{
    "success": true,
    "data": [
        {
            "id": 1,
            "userId": 1,
            "userFullName": "John Doe",
            "payPeriodStart": "2025-01-01",
            "payPeriodEnd": "2025-01-31",
            "baseAmount": 5000.00,
            "overtimeHours": 10,
            "overtimeAmount": 500.00,
            "bonus": 200.00,
            "deductions": 100.00,
            "totalAmount": 5600.00,
            "status": "pending",
            "createdAt": "2025-01-25T10:00:00Z"
        }
    ]
}
```

#### POST `/api/payroll/schedules`

```javascript
// Request Body
{
    "userId": 1,
    "payPeriodStart": "2025-01-01",
    "payPeriodEnd": "2025-01-31",
    "baseAmount": 5000.00,
    "overtimeHours": 10,
    "bonus": 200.00,
    "deductions": 100.00
}

// Response
{
    "success": true,
    "data": {
        "id": 1,
        "totalAmount": 5600.00,
        "status": "pending"
    }
}
```

#### PUT `/api/payroll/schedules/:id/approve`

```javascript
// Headers: Authorization: Bearer <token> (Accounting role required)
// Response
{
    "success": true,
    "message": "Payroll approved successfully"
}
```

#### POST `/api/payroll/schedules/:id/pay`

```javascript
// Headers: Authorization: Bearer <token> (Accounting role required)
// Request Body
{
    "fromWalletAddress": "0x456...def",
    "privateKey": "encrypted_private_key_or_use_wallet_service"
}

// Response
{
    "success": true,
    "data": {
        "transactionHash": "0x789...ghi",
        "status": "pending"
    }
}
```

### 4. Wallet & Blockchain APIs

#### GET `/api/wallet/company`

```javascript
// Headers: Authorization: Bearer <token>
// Response
{
    "success": true,
    "data": {
        "walletAddress": "0x456...def",
        "balance": 150.75,
        "currency": "ETH",
        "balanceUSD": 245120.50
    }
}
```

#### POST `/api/wallet/company/deposit`

```javascript
// Request Body
{
    "amount": 100.5,
    "fromAddress": "0x789...ghi",
    "transactionHash": "0xabc...123"
}

// Response
{
    "success": true,
    "message": "Deposit recorded successfully"
}
```

#### GET `/api/transactions`

```javascript
// Query Params: ?type=payroll&status=confirmed&page=1&limit=20
// Response
{
    "success": true,
    "data": {
        "transactions": [
            {
                "id": 1,
                "transactionHash": "0x123...abc",
                "fromAddress": "0x456...def",
                "toAddress": "0x789...ghi",
                "amount": 5600.00,
                "currency": "ETH",
                "type": "payroll",
                "status": "confirmed",
                "blockNumber": 18500000,
                "gasUsed": 21000,
                "userFullName": "John Doe",
                "createdAt": "2025-01-25T15:30:00Z",
                "confirmedAt": "2025-01-25T15:32:00Z"
            }
        ],
        "pagination": {...}
    }
}
```

### 5. Dashboard Statistics APIs

#### GET `/api/dashboard/employee/:id/stats`

```javascript
// Response
{
    "success": true,
    "data": {
        "currentMonthSalary": 5600.00,
        "totalEarningsThisYear": 67200.00,
        "pendingPayments": 1,
        "walletBalance": 12.5,
        "recentTransactions": [...]
    }
}
```

#### GET `/api/dashboard/accounting/stats`

```javascript
// Response
{
    "success": true,
    "data": {
        "totalEmployees": 25,
        "pendingApprovals": 3,
        "totalPayrollThisMonth": 125000.00,
        "companyWalletBalance": 150.75,
        "recentTransactions": [...]
    }
}
```

## 🔐 Security Requirements

### 1. Authentication Middleware

```javascript
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
```

### 2. Role-based Authorization

```javascript
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: 'Insufficient permissions' 
            });
        }
        next();
    };
};

// Usage: requireRole(['accounting'])
```

### 3. Input Validation

```javascript
const { body, validationResult } = require('express-validator');

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }
        next();
    }
];
```

## 🔗 Blockchain Integration

### 1. Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crm_db
DB_USER=db_user
DB_PASS=db_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=24h

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
COMPANY_WALLET_ADDRESS=0x456...def
COMPANY_WALLET_PRIVATE_KEY=encrypted_private_key

# API
PORT=5000
NODE_ENV=production
```

### 2. Blockchain Service

```javascript
const { ethers } = require('ethers');

class BlockchainService {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
        this.companyWallet = new ethers.Wallet(
            process.env.COMPANY_WALLET_PRIVATE_KEY,
            this.provider
        );
    }

    async sendPayment(toAddress, amount) {
        try {
            const tx = await this.companyWallet.sendTransaction({
                to: toAddress,
                value: ethers.parseEther(amount.toString())
            });
            return tx;
        } catch (error) {
            throw new Error(`Transaction failed: ${error.message}`);
        }
    }

    async getBalance(address) {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance);
    }
}
```

## 📦 Package.json Dependencies

```json
{
    "dependencies": {
        "express": "^4.18.2",
        "mongoose": "^7.5.0",
        "jsonwebtoken": "^9.0.2",
        "bcryptjs": "^2.4.3",
        "cors": "^2.8.5",
        "dotenv": "^16.3.1",
        "express-validator": "^7.0.1",
        "helmet": "^7.0.0",
        "express-rate-limit": "^6.10.0",
        "ethers": "^6.15.0",
        "web3": "^4.0.0"
    },
    "devDependencies": {
        "nodemon": "^3.0.1",
        "jest": "^29.6.2",
        "supertest": "^6.3.3"
    }
}
```

## 🚀 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── payrollController.js
│   │   ├── walletController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── PayrollSchedule.js
│   │   ├── Transaction.js
│   │   └── CompanyWallet.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── payroll.js
│   │   ├── wallet.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── blockchainService.js
│   │   ├── emailService.js
│   │   └── encryptionService.js
│   ├── config/
│   │   └── database.js
│   └── utils/
│       ├── helpers.js
│       └── constants.js
├── tests/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## 📋 Implementation Checklist

### Phase 1: Core Setup (Day 1)

- [ ] Project initialization & dependencies
- [ ] Database setup & migrations
- [ ] Basic Express server with CORS
- [ ] Authentication middleware
- [ ] User model & auth routes

### Phase 2: User Management (Day 2)

- [ ] User CRUD operations
- [ ] Role-based authorization
- [ ] Input validation
- [ ] Error handling middleware

### Phase 3: Payroll System (Day 3)

- [ ] Payroll schedule CRUD
- [ ] Approval workflow
- [ ] Payment processing
- [ ] Transaction logging

### Phase 4: Blockchain Integration (Day 4)

- [ ] Ethereum/Aptos connection
- [ ] Wallet balance monitoring
- [ ] Transaction verification
- [ ] Company wallet management

### Phase 5: Dashboard & Analytics (Day 5)

- [ ] Employee statistics API
- [ ] Accounting dashboard API
- [ ] Transaction history API
- [ ] Performance optimization

## 🔧 Testing Requirements

### 1. Unit Tests

```javascript
// Example: authController.test.js
const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/login', () => {
    test('Should login with valid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.token).toBeDefined();
    });
});
```

### 2. Integration Tests

- API endpoint testing
- Database operations
- Blockchain transactions
- Authentication flows

## 📞 Support & Documentation

### API Documentation

- Sử dụng Swagger/OpenAPI 3.0
- Postman collection export
- Example requests/responses

### Error Handling

```javascript
// Standard error response format
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input data",
        "details": [...validation errors]
    }
}
```

## 🎯 Delivery Timeline

**Total Estimated Time: 5-7 days**

1. **Day 1-2**: Database & Authentication
2. **Day 3-4**: Payroll & User Management
3. **Day 5-6**: Blockchain Integration
4. **Day 7**: Testing & Documentation

## 💡 Notes for Backend Developer

1. **Security First**: Implement proper input validation, SQL injection prevention, và rate limiting
2. **Blockchain Safety**: Handle private keys securely, implement transaction retry logic
3. **Performance**: Use database indexing, caching for frequently accessed data
4. **Monitoring**: Implement logging for all transactions và critical operations
5. **Error Handling**: Provide meaningful error messages for frontend integration
6. **Documentation**: Maintain up-to-date API documentation

---

**Contact Frontend Team:** Cần clarification về API response format hoặc additional endpoints không có trong document này.
