import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, InputNumber, Select, Button, Table, Alert, Spin, Typography } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ethers } from 'ethers';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const { Title } = Typography;
const { Option } = Select;

const DepositCoinsPage = () => {
    const [balance, setBalance] = useState({ usdc: 0, usdt: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([

    ]);

    // Example transaction data
    const transationsExample = [
        { payment_date: '2023-10-01', amount: 10000, stablecoin_type: 'USDC', transaction_hash: '0x1234567890abcdef', status: 'Success' },
        { payment_date: '2023-10-02', amount: 20000, stablecoin_type: 'USDT', transaction_hash: '0xabcdef1234567890', status: 'Success' },
    ]

    
    const [walletAddress, setWalletAddress] = useState('');
    const [form] = Form.useForm();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Lấy số dư ví công ty
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('/api/company-wallet/balance');
                setBalance(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy số dư:', error);
                toast.error('Lỗi khi lấy số dư ví công ty');
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions?type=deposit');
                // Đảm bảo transactions là mảng
                setTransactions(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử giao dịch:', error);
                setTransactions([]);
                toast.error('Lỗi khi lấy lịch sử giao dịch');
            }
        };

        fetchBalance();
        fetchTransactions();
    }, []);

    // Kết nối MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                return accounts[0];
            } catch (error) {
                toast.error('Lỗi khi kết nối MetaMask');
                return null;
            }
        } else {
            toast.error('Vui lòng cài đặt MetaMask');
            return null;
        }
    };

    // Nạp tiền
    const handleDeposit = async (values) => {
        setLoading(true);
        try {
            const wallet = await connectWallet();
            if (!wallet) {
                setLoading(false);
                return;
            }

            // Kiểm tra role: Finance
            const userResponse = await axios.get(`/api/people?wallet_address=${wallet}`);
            if (userResponse.data.role !== 'Finance') {
                toast.error('Chỉ Finance được phép nạp tiền');
                setLoading(false);
                return;
            }

            // TODO: Gọi smart contract Aptos (giả lập)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // const tx = await contract.deposit(values.amount, values.stablecoin_type);

            // Gọi API lưu giao dịch
            await axios.post('/api/company-wallet/deposit', {
                amount: values.amount,
                stablecoin_type: values.stablecoin_type,
                wallet_address: wallet,
            });

            toast.success(`Nạp ${values.amount} ${values.stablecoin_type} thành công!`);
            setIsModalOpen(false);
            form.resetFields();

            // Cập nhật số dư
            const balanceResponse = await axios.get('/api/company-wallet/balance');
            setBalance(balanceResponse.data);

            // Cập nhật lịch sử giao dịch
            const txResponse = await axios.get('/api/transactions?type=deposit');
            setTransactions(Array.isArray(txResponse.data) ? txResponse.data : []);
        } catch (error) {
            console.error('Lỗi nạp tiền:', error);
            toast.error('Nạp tiền thất bại. Vui lòng kiểm tra số dư ví.');
        }
        setLoading(false);
    };

    // Cột bảng lịch sử
    const columns = [
        { title: 'Ngày nạp', dataIndex: 'payment_date', key: 'payment_date' },
        { title: 'Số tiền', dataIndex: 'amount', key: 'amount' },
        { title: 'Loại stablecoin', dataIndex: 'stablecoin_type', key: 'stablecoin_type' },
        {
            title: 'Mã giao dịch',
            dataIndex: 'transaction_hash',
            key: 'transaction_hash',
            render: (text) => (
                <a
                    href={`https://explorer.aptoslabs.com/txn/${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {text.slice(0, 6)}...
                </a>
            ),
        },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    ];

    // Kiểm tra số dư thấp (giả lập: tổng số dư < 1000)
    const isLowBalance = balance.usdc + balance.usdt < 1000;

    return (
        <div className="min-h-screen bg-gray-50 lg:flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                <div className="flex flex-col">
                    {/* Header */}
                    <Header onMenuClick={() => setSidebarOpen(true)} />

                    {/* Content Area */}
                    <div className="flex-1 p-4 sm:p-6">
                        <div className="mb-6 sm:mb-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="mb-2 text-2xl font-bold sm:text-3xl text-zinc-900 font-lexend">
                                        Deposit Coins
                                    </h1>
                                    <p className="font-light text-zinc-400 font-lexend">
                                        {/* Complete list and management of all employees */}
                                    </p>
                                </div>
                                {/* <button
                                    onClick={handleAddEmployee}
                                    className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-indigo-500 rounded-lg hover:bg-indigo-600 font-lexend"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Employee
                                </button> */}
                            </div>
                        </div>

                        {/* Deposit cpn */}
                        <div className="overflow-hidden bg-white border rounded-lg border-zinc-400/20">

                            <div className="min-h-screen p-6 bg-gray-100">
                                {/* Card số dư */}
                                <Card className="p-6 mb-6 bg-white rounded-lg shadow-md">
                                    <div className="mb-4 text-lg font-bold">Số dư ví công ty</div>
                                    <div className="mb-2 text-lg text-gray-700">USDC: {balance.usdc} USDC</div>
                                    <div className="mb-4 text-lg text-gray-700">USDT: {balance.usdt} USDT</div>
                                    {isLowBalance && (
                                        <Alert
                                            message="Số dư không đủ để trả lương! Vui lòng nạp thêm stablecoin."
                                            type="error"
                                            className="p-4 mb-4 text-red-700 bg-red-100 rounded"
                                            showIcon
                                        />
                                    )}
                                    <Button
                                        type="primary"
                                        className="bg-blue-500 hover:bg-blue-600"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Nạp tiền
                                    </Button>
                                </Card>

                                {/* Modal nạp tiền */}
                                <Modal
                                    title="Nạp tiền vào ví công ty"
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    footer={null}
                                    className="max-w-md"
                                >
                                    <Form form={form} onFinish={handleDeposit} layout="vertical">
                                        <Form.Item
                                            name="amount"
                                            label="Số tiền"
                                            rules={[{ required: true, message: 'Vui lòng nhập số tiền' }, { type: 'number', min: 0.01, message: 'Số tiền phải lớn hơn 0' }]}
                                        >
                                            <InputNumber className="w-full" placeholder="Nhập số tiền" />
                                        </Form.Item>
                                        <Form.Item
                                            name="stablecoin_type"
                                            label="Loại stablecoin"
                                            rules={[{ required: true, message: 'Vui lòng chọn loại stablecoin' }]}
                                        >
                                            <Select className="w-full" placeholder="Chọn stablecoin">
                                                <Option value="USDC">USDC</Option>
                                                <Option value="USDT">USDT</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="w-full bg-blue-500 hover:bg-blue-600"
                                                loading={loading}
                                            >
                                                Nạp tiền
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>

                                {/* Bảng lịch sử giao dịch */}
                                <Card className="p-6 bg-white rounded-lg shadow-md">
                                    <div className="mb-4 text-lg font-bold">Lịch sử nạp tiền</div>
                                    {Array.isArray(transactions) ? (
                                        <Table
                                            columns={columns}
                                            dataSource={transationsExample}
                                            pagination={{ pageSize: 5 }}
                                            rowKey="transaction_id"
                                        />
                                    ) : (
                                        <div className="text-red-500">Không có dữ liệu giao dịch</div>
                                    )}
                                </Card>

                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DepositCoinsPage;