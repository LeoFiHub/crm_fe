import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, isAddress } from "viem";
import { payroll_contract } from "../constants/payrollContract";

export const useDeposit = () => {
    const {
        data: txHash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    const deposit = async (amount) => {
        if (!amount) throw new Error("Amount is required");

        const formattedAmount = parseEther(`${amount}`);

        writeContract({
            ...payroll_contract,
            functionName: "deposit",
            value: formattedAmount,
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            txHash,
        });

    return {
        txHash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        deposit,
    };
};

export const useRegisterEmployee = () => {
    const {
        data: txHash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    const registerEmployee = async (address, rate) => {
        if (!address && !rate) throw new Error("Address and rate are required");

        if (!isAddress(address)) throw new Error("Invalid address format");

        const formattedRate = parseEther(`${rate}`);

        writeContract({
            ...payroll_contract,
            functionName: "registerEmployee",
            args: [address, formattedRate],
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            txHash,
        });

    return {
        txHash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        registerEmployee,
    };
};

export const useRunPayroll = () => {
    const {
        data: txHash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    const runPayroll = async () => {
        writeContract({
            ...payroll_contract,
            functionName: "runPayroll",
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            txHash,
        });

    return {
        txHash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        runPayroll,
    };
};

export const useWithdraw = () => {
    const {
        data: txHash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    const withdraw = async (address, amount) => {
        if (!address && !amount)
            throw new Error("Address and amount are required");

        if (!isAddress(address)) throw new Error("Invalid address format");

        const formattedAmount = parseEther(`${amount}`);

        writeContract({
            ...payroll_contract,
            functionName: "withdraw",
            args: [address, formattedAmount],
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            txHash,
        });

    return {
        txHash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        withdraw,
    };
};