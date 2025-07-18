import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../constants/constants";
import { aptosClient } from "../utils/aptosClient";

export const useInitialize = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");
    const { signAndSubmitTransaction } = useWallet();

    const initializeVaultAndPayroll = async (treasuryManager) => {
        setLoading(true);
        setError("");
        try {
            if (!treasuryManager) throw new Error("Address is required");

            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::PayrollAndTreasury::initialize`,
                    typeArguments: [],
                    functionArguments: [treasuryManager],
                },
            };

            const response = await signAndSubmitTransaction(payload);

            await aptosClient().waitForTransaction(response.hash);
            setTxHash(response.hash);
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes("Unexpected token")
            ) {
                setError("");
            } else {
                setError(
                    error.message || String(error) || "Failed to initialize"
                );
            }
            console.log(
                "Initialize error:",
                error,
                error?.message,
                error?.stack
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        initializeVaultAndPayroll,
        txHash,
        loading,
        error,
    };
};

export const useDepositVault = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");
    const { signAndSubmitTransaction } = useWallet();

    const depositVault = async (amount) => {
        setLoading(true);
        setError("");
        try {
            if (!amount) throw new Error("Amount is required");

            const formattedAmount = aptToOctas(amount);

            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::PayrollAndTreasury::deposit`,
                    typeArguments: [],
                    functionArguments: [formattedAmount.toString()],
                },
            };

            const response = await signAndSubmitTransaction(payload);

            await aptosClient().waitForTransaction(response.hash);
            setTxHash(response.hash);
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes("Unexpected token")
            ) {
                setError("");
            } else {
                setError(
                    error.message || String(error) || "Failed to deposit vault"
                );
            }
            console.log("Deposit error:", error, error?.message, error?.stack);
        } finally {
            setLoading(false);
        }
    };

    return {
        depositVault,
        txHash,
        loading,
        error,
    };
};

export const useWithdrawVault = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");
    const { signAndSubmitTransaction } = useWallet();

    const withdrawFundToAddress = async (amount, to) => {
        setLoading(true);
        setError("");
        try {
            if (!amount && !to)
                throw new Error("Amount and receiver are required");

            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::PayrollAndTreasury::withdraw`,
                    typeArguments: [],
                    functionArguments: [amount, to],
                },
            };

            const response = await signAndSubmitTransaction(payload);
            setTxHash(response.hash);

            await aptosClient().waitForTransaction(response.hash);
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes("Unexpected token")
            ) {
                setError("");
            } else {
                setError(
                    error.message || String(error) || "Failed to withdraw vault"
                );
            }
            console.log("Withdraw error:", error, error?.message, error?.stack);
        } finally {
            setLoading(false);
        }
    };

    return {
        withdrawFundToAddress,
        txHash,
        loading,
        error,
    };
};

export const useRegisterAddress = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");
    const { signAndSubmitTransaction } = useWallet();

    const register_employee = async (address, amount) => {
        setLoading(true);
        setError("");
        try {
            if (!amount && !address)
                throw new Error("Amount and employee address are required");

            const formattedAmount = aptToOctas(amount);

            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::PayrollAndTreasury::register_employee`,
                    typeArguments: [],
                    functionArguments: [address, formattedAmount.toString()],
                },
            };

            const response = await signAndSubmitTransaction(payload);

            await aptosClient().waitForTransaction(response.hash);
            setTxHash(response.hash);
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes("Unexpected token")
            ) {
                setError("");
            } else {
                setError(
                    error.message ||
                        String(error) ||
                        "Failed to register employee address"
                );
            }
            console.log("Register error:", error, error?.message, error?.stack);
        } finally {
            setLoading(false);
        }
    };

    return {
        register_employee,
        txHash,
        loading,
        error,
    };
};

export const usePayroll = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");
    const { signAndSubmitTransaction } = useWallet();

    const run_payroll = async () => {
        setLoading(true);
        setError("");
        try {
            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::PayrollAndTreasury::run_payroll`,
                    typeArguments: [],
                    functionArguments: [],
                },
            };

            const response = await signAndSubmitTransaction(payload);
            setTxHash(response.hash);

            await aptosClient().waitForTransaction(response.hash);
        } catch (error) {
            if (
                error instanceof SyntaxError &&
                error.message.includes("Unexpected token")
            ) {
                setError("");
            } else {
                setError(
                    error.message || String(error) || "Failed to run payroll"
                );
            }
            console.log("Payroll error:", error, error?.message, error?.stack);
        } finally {
            setLoading(false);
        }
    };

    return {
        run_payroll,
        txHash,
        loading,
        error,
    };
};

function aptToOctas(amount) {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return BigInt(Math.floor(num * 1e8));
}

// Example to use hook
// import React from "react";
// import { usePayrollContract } from "./hooks/usePayrollContract";

// export default function InitializeComponent() {
//     const { initializeVaultAndPayroll, loading, txHash, error } =
//         usePayrollContract();

//     const handleClick = () => {
//         initializeVaultAndPayroll(); // or pass custom address
//     };

//     return (
//         <div>
//             <button onClick={handleClick} disabled={loading}>
//                 {loading ? "Initializing..." : "Initialize Vault & Payroll"}
//             </button>

//             {txHash && <p>Transaction submitted: {txHash}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//     );
// }