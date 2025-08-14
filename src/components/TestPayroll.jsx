import React, { useState } from "react";
import { useInitialize, useDepositVault, useWithdrawVault, useRegisterAddress, usePayroll } from "../entry-functions/usePayrollAndTreasury";

export default function TestPayroll() {
    const [treasuryManager, setTreasuryManager] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawTo, setWithdrawTo] = useState("");
    const [employeeAddress, setEmployeeAddress] = useState("");
    const [employeeAmount, setEmployeeAmount] = useState("");

    const { initializeVaultAndPayroll,
        loading: initLoading, txHash: initTx, error: initError } = useInitialize();
    const { depositVault,
        loading: depLoading, txHash: depTx, error: depError } = useDepositVault();
    const { withdrawFundToAddress,
        loading: witLoading, txHash: witTx, error: witError } = useWithdrawVault();
    const { register_employee,
        loading: regLoading, txHash: regTx, error: regError } = useRegisterAddress();
    const { run_payroll,
        loading: payLoading, txHash: payTx, error: payError } = usePayroll();

    return (
        <div className="max-w-2xl p-6 mx-auto mt-8 bg-white shadow-lg rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-zinc-800">Test Payroll Hooks</h2>

            {/* Initialize Vault and Payroll */}
            <div className="p-4 mb-6 border rounded-lg bg-zinc-50">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-2/3 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Treasury Manager Address" value={treasuryManager} onChange={e => setTreasuryManager(e.target.value)} />
                    <button className="px-4 py-2 text-white bg-blue-600 rounded-md btn btn-primary hover:bg-blue-700 disabled:bg-blue-300" onClick={() => initializeVaultAndPayroll(treasuryManager)} disabled={initLoading}>
                        {initLoading ? "Initializing..." : "Initialize Vault & Payroll"}
                    </button>
                </div>
                {initTx && <p className="mt-2 text-green-600">Tx: {initTx}</p>}
                {initError && <p className="mt-2 text-red-600">{initError}</p>}
            </div>

            {/* Deposit and Withdraw Vault */}
            <div className="p-4 mb-6 border rounded-lg bg-zinc-50">
                <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center">
                    <input

                        className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-1/2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"

                        placeholder="Deposit Amount"
                        value={depositAmount}
                        onChange={e => setDepositAmount(e.target.value)} />

                    <button
                        className="px-4 py-2 text-white bg-green-600 rounded-md btn btn-success hover:bg-green-700 disabled:bg-green-300"

                        onClick={() => depositVault(depositAmount)}

                        disabled={depLoading}>
                        {depLoading ? "Depositing..." : "Deposit Vault"}
                    </button>
                </div>
                {depTx && <p className="text-green-600">Tx: {depTx}</p>}
                {depError && <p className="text-red-600">{depError}</p>}

                <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:items-center">
                    <input
                        className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-1/3 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"

                        placeholder="Withdraw Amount"

                        value={withdrawAmount}

                        onChange={e => setWithdrawAmount(e.target.value)} />
                    <input className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-1/2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"

                        placeholder="Withdraw To Address"

                        value={withdrawTo}

                        onChange={e => setWithdrawTo(e.target.value)} />

                    <button
                        className="px-4 py-2 text-white bg-yellow-500 rounded-md btn btn-warning hover:bg-yellow-600 disabled:bg-yellow-300"

                        onClick={() => withdrawFundToAddress(withdrawAmount, withdrawTo)}

                        disabled={witLoading}>
                        {witLoading ? "Withdrawing..." : "Withdraw Vault"}
                    </button>
                </div>
                {witTx && <p className="text-green-600">Tx: {witTx}</p>}
                {witError && <p className="text-red-600">{witError}</p>}
            </div>

            {/* Register Employee */}
            <div className="p-4 mb-6 border rounded-lg bg-zinc-50">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                    <input

                        className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-1/2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"

                        placeholder="Employee Address"

                        value={employeeAddress}

                        onChange={e => setEmployeeAddress(e.target.value)} />

                    <input
                        className="w-full px-3 py-2 border rounded-md input input-bordered sm:w-1/3 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Employee Amount"

                        value={employeeAmount}

                        onChange={e => setEmployeeAmount(e.target.value)} />

                    <button
                        className="px-4 py-2 text-white rounded-md btn btn-info bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-300"

                        onClick={() => register_employee(employeeAddress, employeeAmount)}

                        disabled={regLoading}>
                        {regLoading ? "Registering..." : "Register Employee"}
                    </button>
                </div>
                {regTx && <p className="text-green-600">Tx: {regTx}</p>}
                {regError && <p className="text-red-600">{regError}</p>}
            </div>

            {/* Run Payroll */}
            <div className="flex flex-col justify-center gap-2 p-4 mb-2 border rounded-lg bg-zinc-50 sm:flex-row sm:items-center">
                <button
                    className="px-6 py-2 text-white rounded-md btn btn-secondary bg-zinc-700 hover:bg-zinc-800 disabled:bg-zinc-400"

                    onClick={run_payroll}

                    disabled={payLoading}>
                    {payLoading ? "Running Payroll..." : "Run Payroll"}
                </button>
                {payTx && <p className="text-green-600">Tx: {payTx}</p>}
                {payError && <p className="text-red-600">{payError}</p>}
            </div>
        </div>
    );
}