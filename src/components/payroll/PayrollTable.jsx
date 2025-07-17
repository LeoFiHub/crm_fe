import { useState, useMemo, useEffect, useCallback } from 'react';

// Status constants
const STATUS_PENDING = 'Pending';
const STATUS_APPROVED = 'Approved';
const STATUS_PAID = 'Paid';
const STATUS_REJECTED = 'Rejected';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { ChevronDown, ExternalLink } from 'lucide-react';
// import { use } from 'react';
import { getPayrolls, approvePayroll } from '../../api/payroll';
import { toast } from 'react-toastify';

const PayrollTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [payrolls, setPayrolls] = useState();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedStablecoin, setSelectedStablecoin] = useState('all');
    const [selectedDateRange, setSelectedDateRange] = useState('all'); // 'all', 'today', '7days', '30days'
    // Side effect to call get all payrolls
    useEffect(() => {
        const fetchPayrolls = async () => {
            const res = await getPayrolls();
            setPayrolls(res.data.data);
        };

        fetchPayrolls();
    }, []);



    // ============== Side effect ==============
    const handleApprove = useCallback(async (id) => {
        try {
            if (!payrolls) {
                return;
            }

            // Lấy bản ghi payroll cần update trước khi setPayrolls
            const currentPayroll = payrolls.find(p => p.id === id);

            if (!currentPayroll) {
                return;
            }

            // Kiểm tra status từ backend (chữ thường)
            if (currentPayroll.status === 'paid' || currentPayroll.status === 'approved') {
                return;
            }

            // Tạo object để gửi API (status backend là chữ thường)
            // const updatedPayrollForAPI = {
            //     ...currentPayroll,
            //     status: 'approved' // Gửi chữ thường cho backend
            // };



            // Gọi API approve chuyên dụng
            await approvePayroll(id);

            // Cập nhật state với status chữ thường (để mapping đúng)
            setPayrolls(prev => prev.map(p =>
                p.id === id ? { ...p, status: 'approved' } : p
            ));

            toast.success('Payroll approved successfully');
        } catch (error) {
            toast.error('Failed to approve payroll');
            console.error('Error approving payroll:', error);
        }
    }, [payrolls]);

    // Memoized data for payroll (updated fields)
    // const data = useMemo(
    //     () => [
    //         {
    //             id: 1,
    //             fullname: 'Nguyen Van A',
    //             dob: '1990-01-15',
    //             walletAddress: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
    //             amount: 500000,
    //             stablecoin_type: 'USDT',
    //             status: 'Pending',
    //         },
    //         {
    //             id: 2,
    //             fullname: 'Tran Thi B',
    //             dob: '1988-05-22',
    //             walletAddress: '0xabcd1234efgh5678ijkl9012mnop3456qrst7890',
    //             amount: 600000,
    //             stablecoin_type: 'USDC',
    //             status: 'Approved',
    //         },
    //     ],
    //     []
    // );

    const data = useMemo(() => {
        if (!payrolls) return [];

        // Sắp xếp payrolls theo payday tăng dần (cũ nhất trước)
        const sortedPayrolls = [...payrolls].sort((a, b) => new Date(a.payday) - new Date(b.payday));

        const mappedData = sortedPayrolls.map((p) => {
            let status = '';
            switch (p.status?.toLowerCase()) {
                case 'approved':
                    status = STATUS_APPROVED;
                    break;
                case 'paid':
                    status = STATUS_PAID;
                    break;
                case 'rejected':
                    status = STATUS_REJECTED;
                    break;
                case 'pending':
                default:
                    status = STATUS_PENDING;
            }
            return {
                id: p.id,
                fullname: p.employee?.fullName || '',
                walletAddress: p.employee?.walletAddress || '',
                amount: p.amount,
                stablecoin_type: p.stablecoin_type,
                status,
                dob: p.employee?.dateOfBirth ? new Date(p.employee.dateOfBirth).toISOString().split('T')[0] : '',
                payday: p.payday,
            };
        });

        // Date filter logic
        const now = new Date();
        const isSameDay = (date1, date2) => {
            return date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate();
        };

        return mappedData.filter(item => {
            const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
            const matchesStablecoin = selectedStablecoin === 'all' || item.stablecoin_type === selectedStablecoin;
            const matchesSearch = globalFilter === '' ||
                item.fullname.toLowerCase().includes(globalFilter.toLowerCase()) ||
                item.walletAddress.toLowerCase().includes(globalFilter.toLowerCase()) ||
                item.stablecoin_type.toLowerCase().includes(globalFilter.toLowerCase());

            // Date filter
            let matchesDate = true;
            if (selectedDateRange !== 'all' && item.payday) {
                const paydayDate = new Date(item.payday);
                if (selectedDateRange === 'today') {
                    matchesDate = isSameDay(paydayDate, now);
                } else if (selectedDateRange === '7days') {
                    const diff = (now - paydayDate) / (1000 * 60 * 60 * 24);
                    matchesDate = diff >= 0 && diff < 7 && paydayDate <= now;
                } else if (selectedDateRange === '30days') {
                    const diff = (now - paydayDate) / (1000 * 60 * 60 * 24);
                    matchesDate = diff >= 0 && diff < 30 && paydayDate <= now;
                }
            }

            return matchesStatus && matchesStablecoin && matchesSearch && matchesDate;
        });
    }, [payrolls, selectedStatus, selectedStablecoin, globalFilter, selectedDateRange]);

    // Memoized columns for payroll (updated fields)
    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullname',
                header: 'Full Name',
                cell: ({ getValue }) => (
                    <span className="text-sm font-light truncate text-zinc-900 sm:text-base font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'dob',
                header: 'Date of Birth',
                cell: ({ getValue }) => (
                    <span className="text-sm font-light text-zinc-900 sm:text-base font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'payday',
                header: 'Payday',
                cell: ({ getValue }) => (
                    <span className="text-sm font-light text-zinc-900 sm:text-base font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'walletAddress',
                header: 'Wallet Address',
                cell: ({ getValue }) => (
                    <span className="text-xs font-light break-all text-zinc-900 font-lexend">
                        <a
                            href={`https://explorer.aptoslabs.com/txn/${getValue()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            <div className="flex gap-2 tracking-wider">
                                {getValue().slice(0, 6)}...{getValue().slice(-4)}
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </a>

                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                id: 'amount_combined',
                header: 'Amount',
                accessorFn: row => row, // pass full row
                cell: ({ row }) => {
                    const amount = row.original.amount;
                    const stablecoin = row.original.stablecoin_type;
                    return (
                        <span className="text-sm font-light text-zinc-900 sm:text-base font-lexend">
                            {typeof amount === 'number' ? amount.toLocaleString('vi-VN') : ''} {stablecoin}
                        </span>
                    );
                },
                filterFn: 'includesString',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => {
                    const value = getValue();
                    let colorClass = 'bg-yellow-500/10 text-yellow-500';
                    if (value === STATUS_APPROVED) colorClass = 'bg-green-500/10 text-green-500';
                    else if (value === STATUS_PAID) colorClass = 'bg-blue-500/10 text-blue-500';
                    else if (value === STATUS_REJECTED) colorClass = 'bg-red-500/10 text-red-500';
                    return (
                        <div
                            className={`px-2 py-[3px] rounded text-xs font-light font-lexend inline-block ${colorClass}`}
                        >
                            {value}
                        </div>
                    );
                },
                filterFn: 'includesString',
            },
            {
                id: 'actions',
                header: 'Action',
                enableSorting: false,
                enableColumnFilter: false,
                cell: ({ row }) => (
                    <div className="flex gap-2.5">
                        <button
                            className={`px-3 py-1 rounded text-sm font-light font-lexend ${row.original.status === STATUS_APPROVED || row.original.status === STATUS_PAID
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed disabled'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                }`}
                            disabled={row.original.status === STATUS_APPROVED || row.original.status === STATUS_PAID}
                            onClick={() => handleApprove(row.original.id)}
                        >
                            Approve
                        </button>
                    </div>
                ),
            },
        ],
        [handleApprove]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="w-full p-3 overflow-hidden bg-white sm:p-4">
            <div className="flex items-center justify-between mb-4">
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        placeholder="Search employees..."
                        className="w-full max-w-xs h-10 px-3 rounded-[10px] border border-zinc-400/20 text-zinc-900 text-sm font-light font-lexend"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                    >
                        <option value="all">All Status</option>
                        <option value={STATUS_PENDING}>Pending</option>
                        <option value={STATUS_APPROVED}>Approved</option>
                        <option value={STATUS_PAID}>Paid</option>
                        <option value={STATUS_REJECTED}>Rejected</option>
                    </select>

                    {/* Stablecoin Filter */}
                    <select
                        value={selectedStablecoin}
                        onChange={(e) => setSelectedStablecoin(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                    >
                        <option value="all">All Stablecoin</option>
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                        <option value="DAI">DAI</option>
                    </select>

                    {/* Date Range Filter */}
                    <select
                        value={selectedDateRange}
                        onChange={e => setSelectedDateRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-lexend"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                    </select>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            setGlobalFilter('');
                            setSelectedStatus('all');
                            setSelectedStablecoin('all');
                            setSelectedDateRange('all');
                        }}
                        className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 font-lexend"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead className="border-b bg-zinc-400/5 border-zinc-400/10">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={header.id}
                                        className={`px-2 sm:px-4 py-2.5 text-left text-zinc-900 text-sm sm:text-base font-semibold font-lexend ${index === 1 ? 'hidden sm:table-cell' : // CTC
                                            index === 2 ? 'hidden md:table-cell' : // Salary/Month
                                                index === 3 ? 'hidden lg:table-cell' : // Deduction
                                                    index === 4 ? 'hidden md:table-cell' : // status
                                                        ''
                                            }`}
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b border-zinc-400/10 hover:bg-gray-50">
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={cell.id}
                                        className={`px-2 sm:px-4 py-2.5 ${index === 1 ? 'hidden sm:table-cell' : // CTC
                                            index === 2 ? 'hidden md:table-cell' : // Salary/Month
                                                index === 3 ? 'hidden lg:table-cell' : // Deduction
                                                    index === 4 ? 'hidden md:table-cell' : // status
                                                        ''
                                            }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col items-center justify-between gap-4 mt-4 sm:flex-row">
                <div className="flex items-center gap-3 sm:gap-5">
                    <span className="text-sm font-light text-zinc-400 font-lexend">Showing</span>
                    <div className="relative">
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => table.setPageSize(Number(e.target.value))}
                            className="w-16 sm:w-20 h-9 sm:h-11 bg-white rounded-[10px] border border-zinc-400/20 px-2 sm:px-3 appearance-none text-sm"
                        >
                            {[10, 25, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute w-4 h-4 pointer-events-none sm:w-5 sm:h-5 right-1 sm:right-2 top-2 sm:top-3 text-zinc-900" />
                    </div>
                </div>

                <span className="text-xs font-light text-center text-zinc-400 sm:text-sm font-lexend">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        data.length
                    )}{' '}
                    of {data.length} records
                </span>

                <div className="flex gap-2">
                    <button
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayrollTable;