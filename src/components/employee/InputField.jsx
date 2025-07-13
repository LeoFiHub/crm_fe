import React from 'react';

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="relative flex-1 h-14">
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || label}
            className="w-full h-full px-4 rounded-[10px] border border-zinc-400/20 text-base font-light font-lexend text-zinc-900 placeholder:text-zinc-400/80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
    </div>
);

export default InputField;
