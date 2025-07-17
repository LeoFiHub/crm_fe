# Kế Hoạch Tích Hợp Ví Crypto cho CRM System

## 🎯 Tổng Quan

Báo cáo này mô tả chi tiết cách tích hợp **Metamask** và **Petra Wallet** vào hệ thống CRM hiện tại để hỗ trợ thanh toán lương bằng cryptocurrency với 2 vai trò chính: **Employee** và **Accounting**.

## 📊 Cấu Trúc Database

### Users Table

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20),
    walletAddress VARCHAR(42), -- Ethereum address format
    roles ENUM('employee', 'accounting') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Payroll Schedule Table

```sql
CREATE TABLE payroll_schedule (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_employee INT NOT NULL,
    approved_by INT,
    amount DECIMAL(18,8) NOT NULL, -- Support crypto precision
    stablecoin_type ENUM('USDT', 'USDC', 'DAI') NOT NULL,
    payday DATE NOT NULL,
    status ENUM('pending', 'approved', 'paid', 'rejected') DEFAULT 'pending',
    transaction_hash VARCHAR(66), -- Blockchain transaction hash
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_employee) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);
```

## 🏗️ Cấu Trúc Frontend

### 1. Thư Mục Mới Cần Tạo

```
src/
├── services/
│   ├── wallet/
│   │   ├── metamask.js          # MetaMask integration
│   │   ├── petra.js             # Petra Wallet integration
│   │   ├── walletManager.js     # Unified wallet manager
│   │   └── contracts.js         # Smart contract interactions
│   ├── blockchain/
│   │   ├── ethereum.js          # Ethereum network handling
│   │   ├── aptos.js             # Aptos network handling (for Petra)
│   │   └── stablecoin.js        # Stablecoin operations
├── components/
│   ├── wallet/
│   │   ├── WalletConnector.jsx  # Wallet connection component
│   │   ├── WalletBalance.jsx    # Display wallet balance
│   │   ├── TransactionHistory.jsx # Transaction history
│   │   └── WithdrawForm.jsx     # Withdrawal form
│   ├── employee/
│   │   ├── EmployeeWallet.jsx   # Employee wallet dashboard
│   │   └── SalaryHistory.jsx    # Salary history component
│   ├── accounting/
│   │   ├── CompanyWallet.jsx    # Company wallet management
│   │   ├── DepositForm.jsx      # Deposit funds form
│   │   ├── PayrollApproval.jsx  # Payroll approval interface
│   │   └── TransactionLog.jsx   # All transactions log
├── pages/
│   ├── employee/
│   │   ├── EmployeeWalletPage.jsx
│   │   └── SalaryHistoryPage.jsx
│   ├── accounting/
│   │   ├── CompanyWalletPage.jsx
│   │   ├── DepositPage.jsx
│   │   ├── PayrollApprovalPage.jsx
│   │   └── TransactionHistoryPage.jsx
├── hooks/
│   ├── useWallet.js             # Wallet connection hook
│   ├── useBalance.js            # Balance management hook
│   └── useTransactions.js       # Transaction management hook
├── utils/
│   ├── walletUtils.js           # Wallet utility functions
│   ├── formatters.js            # Currency and address formatters
│   └── validators.js            # Wallet address validators
```

### 2. Dependencies Mới Cần Cài Đặt

```json
{
  "dependencies": {
    "ethers": "^6.15.0", // ✅ Đã có
    "@aptos-labs/wallet-adapter-react": "^3.0.0",
    "@aptos-labs/wallet-adapter-petra": "^3.0.0",
    "web3": "^4.0.0",
    "@metamask/sdk": "^0.20.0",
    "bignumber.js": "^9.1.2",
    "decimal.js": "^10.4.3"
  }
}
```

## 🔧 Thực Hiện Chi Tiết

### Phase 1: Cài Đặt Cơ Bản (1-2 ngày)

#### 1.1 Wallet Service Setup

**File: `src/services/wallet/walletManager.js`**

```javascript
// Quản lý kết nối ví tập trung
export class WalletManager {
  // Phát hiện ví có sẵn
  // Kết nối/ngắt kết nối
  // Chuyển đổi giữa các ví
  // Lưu trữ thông tin ví trong localStorage
}
```

**File: `src/services/wallet/metamask.js`**

```javascript
// MetaMask specific operations
export class MetaMaskService {
  // Kết nối MetaMask
  // Lấy địa chỉ ví
  // Thực hiện giao dịch
  // Theo dõi sự kiện
}
```

**File: `src/services/wallet/petra.js`**

```javascript
// Petra Wallet specific operations  
export class PetraService {
  // Kết nối Petra
  // Xử lý Aptos transactions
  // Quản lý APT và tokens
}
```

#### 1.2 Authentication Enhancement

**Cập nhật `src/pages/Login.jsx`**

- Thêm nút "Connect Wallet" bên cạnh form login
- Cho phép login bằng ví crypto
- Xác thực signature từ ví
- Lưu thông tin ví vào user session

#### 1.3 Role-Based Routing

**Cập nhật routing system**

```javascript
// src/App.jsx hoặc router config
const routes = [
  // Employee routes
  { path: '/employee/dashboard', component: EmployeeDashboard, role: 'employee' },
  { path: '/employee/wallet', component: EmployeeWalletPage, role: 'employee' },
  { path: '/employee/salary-history', component: SalaryHistoryPage, role: 'employee' },
  
  // Accounting routes  
  { path: '/accounting/dashboard', component: AccountingDashboard, role: 'accounting' },
  { path: '/accounting/company-wallet', component: CompanyWalletPage, role: 'accounting' },
  { path: '/accounting/deposit', component: DepositPage, role: 'accounting' },
  { path: '/accounting/payroll-approval', component: PayrollApprovalPage, role: 'accounting' },
  { path: '/accounting/transactions', component: TransactionHistoryPage, role: 'accounting' }
];
```

### Phase 2: Employee Features (2-3 ngày)

#### 2.1 Employee Dashboard

- Hiển thị thông tin cá nhân (không cho phép sửa lương)
- Widget ví crypto với balance
- Lịch sử nhận lương gần đây
- Thông báo về payroll sắp tới

#### 2.2 Employee Wallet Management

**Components cần tạo:**

**`src/components/employee/EmployeeWallet.jsx`**

- Hiển thị địa chỉ ví hiện tại
- Kết nối/đổi ví
- Hiển thị balance các loại stablecoin
- Form rút tiền với validation

**`src/components/employee/SalaryHistory.jsx`**

- Bảng lịch sử nhận lương
- Filter theo thời gian, loại coin
- Chi tiết từng giao dịch với transaction hash
- Link đến block explorer

#### 2.3 Employee CRUD Profile

**Cập nhật `src/components/employee/ProfileEmp.jsx`**

- Chặn chỉnh sửa thông tin lương/coin
- Cho phép cập nhật thông tin cá nhân khác
- Validation đầy đủ với react-hook-form

### Phase 3: Accounting Features (3-4 ngày)

#### 3.1 Company Wallet Management

**`src/components/accounting/CompanyWallet.jsx`**

- Hiển thị balance ví công ty
- Multi-wallet support (nhiều địa chỉ ví)
- Real-time balance tracking
- Wallet security features

#### 3.2 Deposit Functionality

**`src/components/accounting/DepositForm.jsx`**

- Form nạp tiền với nhiều stablecoin
- Tích hợp với MetaMask/Petra
- Transaction confirmation
- Update company balance

#### 3.3 Payroll Approval System

**`src/components/accounting/PayrollApproval.jsx`**

- Danh sách nhân viên đến hạn lương
- Thông tin chi tiết: tên, địa chỉ ví, số tiền
- Bulk approval functionality
- Smart contract integration cho auto-transfer

#### 3.4 Employee Management for Accounting

**Cập nhật `src/components/employee/EmployeeTable.jsx`**

- Thêm cột wallet address
- Hiển thị salary information
- Quick actions: approve, reject payroll
- Employee wallet verification status

#### 3.5 Transaction History

**`src/components/accounting/TransactionLog.jsx`**

- Tất cả giao dịch của công ty
- Filter theo loại: deposit, payroll, withdrawal
- Export functionality
- Blockchain verification links

### Phase 4: Smart Contract Integration (2-3 ngày)

#### 4.1 Smart Contract Service

**`src/services/contracts.js`**

```javascript
// Contract interactions
export class ContractService {
  // Deploy/interact với payroll contract
  // Batch payment processing
  // Event listening cho giao dịch
  // Gas estimation
}
```

#### 4.2 Automated Payroll

- Scheduled payroll execution
- Multi-signature support
- Failed transaction handling
- Gas optimization

### Phase 5: Advanced Features (2-3 ngày)

#### 5.1 Security & Validation

- Wallet address validation
- Transaction signing verification
- Rate limiting cho withdrawals
- Multi-factor authentication

#### 5.2 Notifications & Alerts

- Real-time notifications cho giao dịch
- Email alerts cho payroll events
- Push notifications
- Transaction status updates

#### 5.3 Analytics & Reporting

- Payroll analytics dashboard
- Cost analysis (gas fees)
- Employee payment patterns
- Compliance reporting

## 🔒 Security Considerations

### Wallet Security

1. **Private Key Protection**: Không bao giờ lưu private keys
2. **Address Verification**: Xác thực wallet ownership
3. **Transaction Limits**: Giới hạn số tiền withdraw/transfer
4. **Multi-signature**: Cho các giao dịch lớn

### API Security  

1. **JWT Authentication**: Bảo vệ API endpoints
2. **Role-based Access**: Phân quyền chặt chẽ
3. **Rate Limiting**: Chống spam/abuse
4. **Input Validation**: Validate tất cả inputs

### Data Protection

1. **Encryption**: Mã hóa sensitive data
2. **Audit Logs**: Log tất cả actions
3. **Backup Strategy**: Backup blockchain data
4. **Compliance**: Tuân thủ regulations

## 🧪 Testing Strategy

### Unit Tests

- Wallet connection functions
- Transaction processing
- Balance calculations
- Role-based access control

### Integration Tests  

- Wallet provider integration
- API endpoint testing
- Database operations
- Smart contract interactions

### End-to-End Tests

- Complete payroll flow
- Employee wallet management
- Accounting operations
- Cross-browser compatibility

## 📱 UI/UX Considerations

### Employee Interface

- **Simple & Clean**: Easy wallet management
- **Clear History**: Transparent salary tracking
- **Mobile Responsive**: On-the-go access
- **Intuitive Navigation**: Role-specific menus

### Accounting Interface

- **Power User Focus**: Advanced features
- **Bulk Operations**: Efficient payroll processing  
- **Real-time Data**: Live balance updates
- **Comprehensive Logs**: Detailed transaction history

## 🚀 Deployment Plan

### Development Environment

1. Local blockchain setup (Ganache/Hardhat)
2. Test wallet configuration
3. Mock transaction data
4. Development wallet addresses

### Staging Environment

1. Testnet deployment (Goerli/Aptos Testnet)
2. Real wallet testing
3. Performance optimization
4. Security audit

### Production Environment

1. Mainnet smart contracts
2. Production wallet setup
3. Monitoring & alerts
4. Backup procedures

## 📈 Future Enhancements

### Advanced Features

- **DeFi Integration**: Yield farming cho company funds
- **Multi-chain Support**: BSC, Polygon, Arbitrum
- **NFT Rewards**: Employee recognition system
- **DAO Governance**: Decentralized decision making

### Analytics & Insights

- **Predictive Analytics**: Payroll forecasting
- **Cost Optimization**: Gas fee reduction
- **Employee Insights**: Payment preferences
- **Market Integration**: Real-time crypto rates

## 🔧 Technical Implementation Notes

### Current Codebase Integration

1. **Existing Components**: Tái sử dụng `EmployeeTable`, `PayrollTable`
2. **API Structure**: Mở rộng `user.js`, `payroll.js` APIs
3. **Styling**: Giữ nguyên Tailwind theme hiện tại
4. **Form Handling**: Sử dụng react-hook-form pattern có sẵn

### Performance Optimization

1. **Lazy Loading**: Components và routes
2. **Caching**: Wallet balances và transaction data
3. **Debouncing**: API calls và blockchain queries
4. **Pagination**: Large dataset handling

### Error Handling

1. **Network Issues**: Blockchain connection problems
2. **Transaction Failures**: Gas estimation errors
3. **Wallet Issues**: Connection/signature problems
4. **API Errors**: Backend communication failures

---

## 📋 Checklist Thực Hiện - UPDATED

### Phase 1: Setup ✅ COMPLETED

- [x] Cài đặt dependencies mới
- [x] Tạo cấu trúc thư mục
- [x] Setup wallet services
- [x] Cập nhật authentication

### Phase 2: Employee Features ✅ COMPLETED  

- [x] Employee dashboard
- [x] Wallet management interface
- [x] Salary history component
- [x] Profile CRUD (restricted)

### Phase 3: Accounting Features ✅ COMPLETED

- [x] Company wallet dashboard  
- [x] Deposit functionality
- [x] Payroll approval system
- [x] Employee management enhancements
- [x] Transaction logging

### Phase 4: Smart Contracts ⏳ OPTIONAL

- [ ] Contract service setup
- [ ] Automated payroll
- [ ] Event handling
- [ ] Error recovery

### Phase 5: Advanced Features ⏳ OPTIONAL

- [ ] Security implementations
- [ ] Notification system
- [ ] Analytics dashboard
- [ ] Testing & deployment

---

**Tổng thời gian ước tính: 10-15 ngày làm việc**

**Ưu tiên cao nhất**: Phase 1-3 (core functionality)
**Có thể hoãn**: Phase 4-5 (advanced features)

Báo cáo này cung cấp roadmap chi tiết để tích hợp wallet functionality vào CRM system hiện tại với focus vào user experience và security. Mỗi phase có thể được thực hiện độc lập và test riêng biệt.

## 🔐 Quy Trình Đăng Ký & Kết Nối Ví

### Câu Hỏi: "Khi thực hiện kết nối ví thì tôi có cần đăng ký hay như nào không?"

**Trả lời:** Bạn có **3 cách** để xử lý việc đăng ký/kết nối ví:

### Option 1: Đăng Ký Truyền Thống + Kết Nối Ví (Khuyến nghị)

```javascript
// Quy trình: Register → Login → Connect Wallet
1. User đăng ký account bằng email/password (như hiện tại)
2. Admin/HR tạo sẵn user với role và thông tin cơ bản
3. User login bằng email/password
4. Sau khi login, user kết nối ví crypto của mình
5. Wallet address được lưu vào database
```

**Ưu điểm:**

- ✅ Bảo mật cao (có backup authentication)
- ✅ Dễ quản lý user
- ✅ Có thể login khi không có ví
- ✅ Phù hợp với quy trình HR hiện tại

### Option 2: Đăng Ký Bằng Ví (Web3 Native)

```javascript
// Quy trình: Connect Wallet → Sign Message → Auto Register
1. User click "Connect Wallet" 
2. Chọn ví (MetaMask/Petra)
3. Ký message để xác thực ownership
4. Tự động tạo account với wallet address
5. Admin/HR assign role sau
```

**Ưu điểm:**

- ✅ Trải nghiệm Web3 thuần túy
- ✅ Không cần nhớ password
- ✅ Nhanh chóng

**Nhược điểm:**

- ❌ Phụ thuộc hoàn toàn vào ví
- ❌ Khó quản lý nếu mất ví
- ❌ Cần quy trình riêng cho HR

### Option 3: Hybrid Approach (Linh hoạt nhất)

```javascript
// Hỗ trợ cả 2 cách đăng ký
1. Traditional: Email + Password
2. Web3: Connect Wallet only
3. Users có thể link wallet sau khi đăng ký traditional
4. Hoặc link email/password sau khi đăng ký bằng wallet
```

## 🔧 Implementation Chi Tiết

### Cách 1: Traditional + Wallet (Khuyến nghị cho bạn)

#### Step 1: Cập nhật Registration Flow

**File: `src/pages/Register.jsx`** (tạo mới)

```javascript
const Register = () => {
  // Form đăng ký với email, password, fullName, phone
  // Sau khi đăng ký thành công → redirect to wallet setup
};
```

**File: `src/pages/WalletSetup.jsx`** (tạo mới)

```javascript
const WalletSetup = () => {
  // Màn hình kết nối ví sau khi đăng ký
  // Optional step - có thể skip và setup sau
};
```

#### Step 2: Enhanced Login Flow

**Cập nhật `src/pages/Login.jsx`**

```javascript
const Login = () => {
  return (
    <div>
      {/* Existing email/password form */}
      
      {/* OR divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="mx-4 text-gray-500">OR</div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      {/* Wallet login buttons */}
      <div className="space-y-3">
        <button className="wallet-connect-btn metamask">
          Connect with MetaMask
        </button>
        <button className="wallet-connect-btn petra">
          Connect with Petra Wallet
        </button>
      </div>
    </div>
  );
};
```

#### Step 3: Wallet Connection Service

**File: `src/services/auth/walletAuth.js`**

```javascript
export class WalletAuthService {
  
  // Đăng ký mới bằng ví
  async registerWithWallet(walletAddress, signature) {
    // 1. Verify signature
    // 2. Check if wallet already exists
    // 3. Create new user account
    // 4. Return JWT token
  }
  
  // Login bằng ví
  async loginWithWallet(walletAddress, signature) {
    // 1. Verify signature  
    // 2. Find user by wallet address
    // 3. Return JWT token
  }
  
  // Kết nối ví vào account hiện tại
  async connectWalletToAccount(userId, walletAddress, signature) {
    // 1. Verify signature
    // 2. Check wallet không bị trùng
    // 3. Update user record
  }
  
  // Xác thực ownership ví
  async verifyWalletOwnership(walletAddress) {
    // 1. Generate random message
    // 2. Request user sign message
    // 3. Verify signature matches address
  }
}
```

### Database Schema Update

```sql
-- Thêm columns cho wallet authentication
ALTER TABLE users ADD COLUMN (
    walletAddress VARCHAR(42) UNIQUE,
    walletType ENUM('metamask', 'petra') NULL,
    walletConnectedAt TIMESTAMP NULL,
    isWalletVerified BOOLEAN DEFAULT FALSE,
    
    -- Keep existing email/password optional for wallet-only users
    email VARCHAR(255) NULL, -- Change from NOT NULL
    password VARCHAR(255) NULL -- Change from NOT NULL
);

-- Ensure either email or walletAddress exists
ALTER TABLE users ADD CONSTRAINT check_auth_method 
CHECK (email IS NOT NULL OR walletAddress IS NOT NULL);
```

## 🚦 Quy Trình Đề Xuất Cho Dự Án Của Bạn

Dựa trên tình hình hackathon và thời gian có hạn, tôi đề xuất:

### Phase 1: Quick Implementation (1-2 ngày)

```javascript
// Giữ nguyên system đăng ký hiện tại
// Thêm wallet connection như optional step

1. User đăng ký/login bằng email + password (như hiện tại)
2. Sau khi login → popup "Connect Your Wallet" 
3. User có thể skip hoặc connect wallet ngay
4. Admin tạo sẵn demo accounts với roles
```

### Sample Demo Data

```sql
-- Demo users cho hackathon
INSERT INTO users VALUES 
(1, 'John Employee', 'employee@demo.com', 'password123', '0123456789', NULL, 'employee'),
(2, 'Jane Accounting', 'accounting@demo.com', 'password123', '0987654321', NULL, 'accounting');

-- Sau khi demo user connect wallet, update walletAddress
UPDATE users SET walletAddress = '0x742d35Cc6634C0532925a3b8D23F4E' WHERE id = 1;
```

### Demo Flow

```
1. Login với demo account
   ↓
2. Dashboard hiển thị "Wallet not connected"  
   ↓
3. Click "Connect Wallet" → MetaMask popup
   ↓  
4. Successful connection → Update database
   ↓
5. Now can view balance, receive/send crypto
```

## 🎉 HACKATHON READY STATUS

### ✅ Core Functionality Complete (Phase 1-3)

**🔥 Demo Ready Features:**

1. **Authentication System**
   - Role-based login (Employee/Accounting)
   - Demo accounts ready
   - Wallet integration optional

2. **Employee Portal**
   - Personal dashboard với wallet integration
   - Wallet connection flow
   - Balance display
   - Withdrawal functionality
   - Salary history view

3. **Accounting Portal**
   - Company dashboard
   - Employee management
   - Payroll approval system
   - Company wallet overview
   - Transaction history
   - Deposit functionality

4. **Wallet Integration**
   - MetaMask support
   - Real-time balance
   - Transaction mock system
   - Secure connection flow

### 🚀 Demo Script

```bash
# 1. Start the application
npm run dev

# 2. Navigate to http://localhost:5173

# 3. Login với demo accounts:
Employee: employee@demo.com / password123
Accounting: accounting@demo.com / password123

# 4. Test wallet connection (MetaMask required)

# 5. Explore role-specific features
```

### 💡 Presentation Points

1. **Problem Solved**: Traditional payroll → Crypto payroll
2. **Key Innovation**: Seamless Web3 integration trong existing CRM
3. **User Experience**: Role-based UI, intuitive workflow
4. **Security**: Wallet ownership verification
5. **Scalability**: Ready for smart contract integration

### 📊 Technical Achievements

- **Frontend**: React + Tailwind + Wallet Integration
- **State Management**: Custom hooks + localStorage
- **Mock Backend**: Comprehensive demo data
- **Security**: Role-based access control
- **UX**: Responsive design + Error handling

**Total Implementation Time**: ~8 hours
**Status**: ✅ HACKATHON READY
**Next Steps**: Smart contracts integration (Phase 4-5)
