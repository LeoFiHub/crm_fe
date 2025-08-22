import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useDeposit, useRegisterEmployee, useRunPayroll, useWithdraw } from '../hooks/usePayrollContract';

export default function TestPayrollLisk() {
    const [depositAmount, setDepositAmount] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [employeeRate, setEmployeeRate] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawTo, setWithdrawTo] = useState('');

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const { deposit, loading: depLoading, isSuccess: depSuccess, error: depError } = useDeposit();
    const { registerEmployee, loading: regLoading, isSuccess: regSuccess, error: regError } = useRegisterEmployee();
    const { runPayroll, loading: payLoading, isSuccess: paySuccess, error: payError } = useRunPayroll();
    const { withdraw, loading: witLoading, isSuccess: witSuccess, error: witError } = useWithdraw();

    return (
        <div className="max-w-4xl p-6 mx-auto mt-8 bg-white shadow-lg rounded-xl">
            <h2 className="mb-8 text-3xl font-bold text-center text-zinc-800">Test Lisk EVM Payroll</h2>

            {/* Wallet Connection */}
            <div className="p-6 mb-8 border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                {isConnected ? (
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-green-700">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                        <button
                            onClick={() => disconnect()}
                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4 text-gray-700">Connect your MetaMask wallet to Lisk Sepolia:</p>
                        {connectors.map((connector) => (
                            <button
                                key={connector.uid}
                                onClick={() => connect({ connector })}
                                className="px-6 py-3 mr-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Connect {connector.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Deposit */}
            <div className="p-6 mb-6 border border-green-200 rounded-lg bg-green-50">
                <h3 className="mb-4 text-xl font-semibold text-green-800">Deposit to Contract</h3>
                <div className="flex items-end gap-4">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Amount (ETH)</label>
                        <input
                            type="number"
                            step="0.001"
                            placeholder="0.1"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        onClick={() => deposit(depositAmount)}
                        disabled={depLoading || !isConnected}
                        className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {depLoading ? 'Depositing...' : 'Deposit'}
                    </button>
                </div>
                {depSuccess && <p className="mt-2 text-green-600">✅ Deposit successful!</p>}
                {depError && <p className="mt-2 text-red-600">❌ {depError.message}</p>}
            </div>

            {/* Register Employee */}
            <div className="p-6 mb-6 border rounded-lg bg-cyan-50 border-cyan-200">
                <h3 className="mb-4 text-xl font-semibold text-cyan-800">Register Employee</h3>
                <div className="grid items-end grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Employee Address</label>
                        <input
                            type="text"
                            placeholder="0x..."
                            value={employeeAddress}
                            onChange={(e) => setEmployeeAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Daily Rate (Wei)</label>
                        <input
                            type="number"
                            placeholder="1000000000000000000"
                            value={employeeRate}
                            onChange={(e) => setEmployeeRate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <button
                        onClick={() => registerEmployee(employeeAddress, employeeRate)}
                        disabled={regLoading || !isConnected}
                        className="px-6 py-2 text-white rounded-md bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400"
                    >
                        {regLoading ? 'Registering...' : 'Register'}
                    </button>
                </div>
                {regSuccess && <p className="mt-2 text-green-600">✅ Employee registered!</p>}
                {regError && <p className="mt-2 text-red-600">❌ {regError.message}</p>}
            </div>

            {/* Run Payroll */}
            <div className="p-6 mb-6 border border-purple-200 rounded-lg bg-purple-50">
                <h3 className="mb-4 text-xl font-semibold text-purple-800">Run Payroll</h3>
                <button
                    onClick={() => runPayroll()}
                    disabled={payLoading || !isConnected}
                    className="px-8 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                    {payLoading ? 'Running Payroll...' : 'Run Payroll'}
                </button>
                {paySuccess && <p className="mt-2 text-green-600">✅ Payroll completed!</p>}
                {payError && <p className="mt-2 text-red-600">❌ {payError.message}</p>}
            </div>

            {/* Withdraw */}
            <div className="p-6 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
                <h3 className="mb-4 text-xl font-semibold text-yellow-800">Withdraw Funds</h3>
                <div className="grid items-end grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Amount (Wei)</label>
                        <input
                            type="number"
                            placeholder="1000000000000000000"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">To Address</label>
                        <input
                            type="text"
                            placeholder="0x..."
                            value={withdrawTo}
                            onChange={(e) => setWithdrawTo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <button
                        onClick={() => withdraw(withdrawTo, withdrawAmount)}
                        disabled={witLoading || !isConnected}
                        className="px-6 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 disabled:bg-gray-400"
                    >
                        {witLoading ? 'Withdrawing...' : 'Withdraw'}
                    </button>
                </div>
                {witSuccess && <p className="mt-2 text-green-600">✅ Withdrawal successful!</p>}
                {witError && <p className="mt-2 text-red-600">❌ {witError.message}</p>}
            </div>
        </div>
    );
}