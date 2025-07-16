// Mock data for demo purposes
export const mockUsers = [
    {
        id: 1,
        fullName: 'John Smith',
        email: 'employee@demo.com',
        password: 'password123',
        phoneNumber: '+1234567890',
        walletAddress: '0x742d35Cc6634C0532925a3b8D23F4E',
        roles: 'employee',
        // department: 'Engineering',
        // position: 'Senior Developer',
        joinDate: '2023-01-15',
        salary: 5000,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 2,
        fullName: 'Jane Doe',
        email: 'accounting@demo.com',
        password: 'password123',
        phoneNumber: '+1234567891',
        walletAddress: '0x8ba1f109551bD432803012645Hac136c',
        roles: 'accounting',
        department: 'Finance',
        position: 'Finance Manager',
        joinDate: '2022-08-20',
        salary: 6000,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 3,
        fullName: 'Mike Johnson',
        email: 'mike.johnson@demo.com',
        password: 'password123',
        phoneNumber: '+1234567892',
        walletAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        roles: 'employee',
        department: 'Marketing',
        position: 'Marketing Specialist',
        joinDate: '2023-03-10',
        salary: 4000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 4,
        fullName: 'Sarah Wilson',
        email: 'sarah.wilson@demo.com',
        password: 'password123',
        phoneNumber: '+1234567893',
        walletAddress: '0xA0b86a33E6842b5cc62c645eA22B5E3c96b15A8A',
        roles: 'employee',
        department: 'Design',
        position: 'UI/UX Designer',
        joinDate: '2023-05-01',
        salary: 4500,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3'
    }
];

export const mockPayrollSchedule = [
    {
        id: 1,
        id_employee: 1,
        approved_by: 2,
        amount: 5000,
        stablecoin_type: 'USDT',
        payday: '2025-01-31',
        status: 'pending',
        transaction_hash: null,
        createdAt: '2025-01-15T00:00:00Z',
        employee_name: 'John Smith',
        employee_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
        employee_wallet: '0x742d35Cc6634C0532925a3b8D23F4E'
    },
    {
        id: 2,
        id_employee: 3,
        approved_by: null,
        amount: 4000,
        stablecoin_type: 'USDC',
        payday: '2025-01-31',
        status: 'pending',
        transaction_hash: null,
        createdAt: '2025-01-15T00:00:00Z',
        employee_name: 'Mike Johnson',
        employee_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
        employee_wallet: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    },
    {
        id: 3,
        id_employee: 4,
        approved_by: 2,
        amount: 4500,
        stablecoin_type: 'USDT',
        payday: '2025-01-31',
        status: 'approved',
        transaction_hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f',
        createdAt: '2025-01-15T00:00:00Z',
        employee_name: 'Sarah Wilson',
        employee_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
        employee_wallet: '0xA0b86a33E6842b5cc62c645eA22B5E3c96b15A8A'
    },
    {
        id: 4,
        id_employee: 1,
        approved_by: 2,
        amount: 5000,
        stablecoin_type: 'USDT',
        payday: '2024-12-31',
        status: 'paid',
        transaction_hash: '0x9f8e7d6c5b4a3928374656483729384756473829384756473829384756473829',
        createdAt: '2024-12-15T00:00:00Z',
        employee_name: 'John Smith',
        employee_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
        employee_wallet: '0x742d35Cc6634C0532925a3b8D23F4E'
    }
];

export const mockTransactions = [
    {
        id: 1,
        type: 'deposit',
        amount: 50000,
        currency: 'USDT',
        from_address: '0x8ba1f109551bD432803012645Hac136c',
        to_address: '0xCompanyWalletAddress123456789',
        transaction_hash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123',
        status: 'completed',
        timestamp: '2025-01-10T10:30:00Z',
        description: 'Company fund deposit'
    },
    {
        id: 2,
        type: 'payroll',
        amount: 5000,
        currency: 'USDT',
        from_address: '0xCompanyWalletAddress123456789',
        to_address: '0x742d35Cc6634C0532925a3b8D23F4E',
        transaction_hash: '0x9f8e7d6c5b4a3928374656483729384756473829384756473829384756473829',
        status: 'completed',
        timestamp: '2024-12-31T15:00:00Z',
        description: 'Salary payment to John Smith',
        employee_name: 'John Smith'
    },
    {
        id: 3,
        type: 'payroll',
        amount: 4500,
        currency: 'USDT',
        from_address: '0xCompanyWalletAddress123456789',
        to_address: '0xA0b86a33E6842b5cc62c645eA22B5E3c96b15A8A',
        transaction_hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f',
        status: 'completed',
        timestamp: '2025-01-15T12:00:00Z',
        description: 'Salary payment to Sarah Wilson',
        employee_name: 'Sarah Wilson'
    },
    {
        id: 4,
        type: 'withdrawal',
        amount: 1000,
        currency: 'USDT',
        from_address: '0x742d35Cc6634C0532925a3b8D23F4E',
        to_address: '0xExternalWalletAddress987654321',
        transaction_hash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123ghi456',
        status: 'completed',
        timestamp: '2025-01-12T09:15:00Z',
        description: 'Personal withdrawal',
        employee_name: 'John Smith'
    }
];

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

// Auth helper functions
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

export const getCurrentUser = () => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    return null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token');
};

export const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('wallet_info');
    localStorage.removeItem('wallet_connected');
};
