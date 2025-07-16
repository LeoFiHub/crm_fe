import { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { ChevronDown, ExternalLink } from 'lucide-react';

const PayrollTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    // Memoized data for payroll (updated fields)
    const data = useMemo(
        () => [
            {
                id: 1,
                fullname: 'Nguyen Van A',
                dob: '1990-01-15',
                walletAddress: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
                amount: 500000,
                stablecoin_type: 'USDT',
                Status: 'Pending',
            },
            {
                id: 2,
                fullname: 'Tran Thi B',
                dob: '1988-05-22',
                walletAddress: '0xabcd1234efgh5678ijkl9012mnop3456qrst7890',
                amount: 600000,
                stablecoin_type: 'USDC',
                Status: 'Approved',
            },
        ],
        []
    );

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
                accessorKey: 'amount',
                header: 'Amount',
                cell: ({ getValue }) => (
                    <span className="text-sm font-light text-zinc-900 sm:text-base font-lexend">
                        {typeof getValue() === 'number' ? getValue().toLocaleString('vi-VN') : ''}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'stablecoin_type',
                header: 'Stablecoin',
                cell: ({ getValue }) => (
                    <span className="text-sm font-light text-zinc-900 sm:text-base font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'Status',
                header: 'Status',
                cell: ({ getValue }) => (
                    <div
                        className={`px-2 py-[3px] rounded text-xs font-light font-lexend inline-block ${getValue() === 'Approved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                    >
                        {getValue()}
                    </div>
                ),
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
                            className={`px-3 py-1 rounded text-sm font-light font-lexend ${row.original.Status === 'Approved'
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                }`}
                            disabled={row.original.Status === 'Approved'}
                            onClick={() => console.log(`Approve ${row.original.fullname}`)} // Replace with actual approve logic
                        >
                            Approve
                        </button>
                    </div>
                ),
            },
        ],
        []
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
                                                    index === 4 ? 'hidden md:table-cell' : // Status
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
                                                    index === 4 ? 'hidden md:table-cell' : // Status
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