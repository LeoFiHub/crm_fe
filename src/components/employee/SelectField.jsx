import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, value, onChange, options, placeholder }) => (
    <div className="relative flex-1">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-14 px-4 pr-10 rounded-[10px] border border-zinc-400/20 text-base font-light font-lexend text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
        >
            <option value="" disabled>{placeholder || label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-1/2">
            <ChevronDown className="w-5 h-5 text-zinc-900" />
        </div>
    </div>
);

export default SelectField;
