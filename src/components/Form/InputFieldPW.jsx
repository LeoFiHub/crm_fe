import React, { forwardRef } from 'react';

const InputFieldPW = forwardRef(({
    label,
    placeholder,
    type = "text",
    error,
    ...props
}, ref) => (

    <div className="flex items-center w-full px-4 py-2 border border-indigo-500 rounded-lg">
        <div className="flex-grow">
            <label className="block mb-1 text-xs font-light text-indigo-500 font-lexend">
                Password
            </label>
            <input
                ref={ref}
                type={type}
                placeholder={placeholder || label}
                
                type={showPassword ? "text" : "password"}
                defaultValue="12345678"
                className="w-full text-base font-light bg-transparent outline-none text-zinc-900"
            />
        </div>
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-3 focus:outline-none"
        >
            {!showPassword ? (
                <EyeOff className="w-5 h-5 text-zinc-900" />
            ) : (
                <Eye className="w-5 h-5 text-zinc-900" />
            )}
        </button>
    </div>

    // <div className="relative flex-1 h-14">
    //     <input
    //         ref={ref}
    //         type={type}
    //         placeholder={placeholder || label}
    //         className={`w-full h-full px-4 rounded-[10px] border text-base font-light font-lexend text-zinc-900 placeholder:text-zinc-400/80 focus:outline-none focus:ring-1 
    //             ${error
    //                 ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    //                 : 'border-zinc-400/20 focus:border-indigo-500 focus:ring-indigo-500'
    //             }`}
    //         {...props}
    //     />
    //     {error && (
    //         <span className="absolute left-0 text-xs text-red-500 -bottom-5 font-lexend">
    //             {error}
    //         </span>
    //     )}
    // </div>
));

InputFieldPW.displayName = 'InputFieldPW';

export default InputFieldPW;
