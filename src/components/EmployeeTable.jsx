import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { Eye, Edit, Trash2, ChevronDown } from 'lucide-react';

const EmployeeTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    // Memoize the data to prevent unnecessary re-computation
    const data = useMemo(
        () => [
            {
                id: 1,
                name: 'Bessie Cooper',
                phone: '091233412',
                department: 'HR',
                designation: 'HR Manager',
                type: 'Office',
                status: 'Permanent',
                avatar:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
            },
            {
                id: 2,
                name: 'Devon Lane',
                phone: '091233412',
                department: 'BA',
                designation: 'Business Analyst',
                type: 'Remote',
                status: 'Permanent',
                avatar:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
            },
        ],
        []
    );

    // Memoize the columns to prevent re-computation on every render
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Employee Name',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
                            src={row.original.avatar}
                            alt={row.original.name}
                            loading="lazy"
                        />
                        <span className="text-zinc-900 text-sm sm:text-base font-light font-lexend truncate">
                            {row.original.name}
                        </span>
                    </div>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                cell: ({ getValue }) => (
                    <span className="text-zinc-900 text-sm sm:text-base font-light font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'department',
                header: 'Department',
                cell: ({ getValue }) => (
                    <span className="text-zinc-900 text-sm sm:text-base font-light font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'designation',
                header: 'Designation',
                cell: ({ getValue }) => (
                    <span className="text-zinc-900 text-sm sm:text-base font-light font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: ({ getValue }) => (
                    <span className="text-zinc-900 text-sm sm:text-base font-light font-lexend">
                        {getValue()}
                    </span>
                ),
                filterFn: 'includesString',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => (
                    <div className="px-2 py-[3px] bg-indigo-500/10 rounded text-indigo-500 text-xs font-light font-lexend inline-block">
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
                cell: () => (
                    <div className="flex gap-1 sm:gap-2.5">
                        <button className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-gray-100 rounded flex items-center justify-center">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
                        </button>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-gray-100 rounded flex items-center justify-center">
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
                        </button>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-gray-100 rounded flex items-center justify-center">
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
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
        <div className="w-full bg-white overflow-hidden p-3 sm:p-4">
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

            {/* Table Container - Horizontal scroll on mobile */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead className="bg-zinc-400/5 border-b border-zinc-400/10">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={header.id}
                                        className={`px-2 sm:px-4 py-2.5 text-left text-zinc-900 text-sm sm:text-base font-semibold font-lexend ${
                                            // Hide columns on mobile based on priority
                                            index === 1 ? 'hidden sm:table-cell' : // Phone
                                                index === 2 ? 'hidden md:table-cell' : // Department  
                                                    index === 3 ? 'hidden lg:table-cell' : // Designation
                                                        index === 4 ? 'hidden md:table-cell' : // Type
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
                                        className={`px-2 sm:px-4 py-2.5 ${
                                            // Hide columns on mobile based on priority
                                            index === 1 ? 'hidden sm:table-cell' : // Phone
                                                index === 2 ? 'hidden md:table-cell' : // Department
                                                    index === 3 ? 'hidden lg:table-cell' : // Designation
                                                        index === 4 ? 'hidden md:table-cell' : // Type
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
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <div className="flex items-center gap-3 sm:gap-5">
                    <span className="text-zinc-400 text-sm font-light font-lexend">Showing</span>
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
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 absolute right-1 sm:right-2 top-2 sm:top-3 text-zinc-900 pointer-events-none" />
                    </div>
                </div>

                <span className="text-zinc-400 text-xs sm:text-sm font-light font-lexend text-center">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        data.length
                    )}{' '}
                    of {data.length} records
                </span>

                <div className="flex gap-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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

export default EmployeeTable;