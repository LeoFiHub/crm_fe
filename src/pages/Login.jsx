import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đăng nhập ở đây
        navigate('/dashboard');
    };

    return (
        <div className="w-screen h-screen relative bg-white overflow-hidden">
            {/* Background Image Container */}
            <div className="w-[815px] h-[964px] left-[30px] top-[30px] absolute bg-indigo-500/5 rounded-[30px]" />
            <img
                className="w-[685px] h-[778px] left-[160px] top-[123px] absolute rounded-tl-[36px] rounded-bl-[36px] object-cover"
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Office workspace"
            />

            {/* Login Form */}
            <div className="left-[895px] top-[278px] absolute inline-flex flex-col justify-start items-start gap-10">
                {/* Logo */}
                <div className="w-44 h-20 relative overflow-hidden">
                    <div className="left-[0.35px] top-[9.94px] absolute inline-flex justify-start items-start gap-0.5">
                        <div className="w-14 h-14 bg-violet-500 rounded-[32px] flex items-center justify-center">
                            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-violet-500 font-bold text-lg">C</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-28 h-7 left-[66.28px] top-[22.74px] absolute flex items-center">
                        <span className="text-zinc-900 font-semibold text-xl font-lexend">CRM</span>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex flex-col justify-start items-start gap-7">
                    {/* Header */}
                    <div className="flex flex-col justify-start items-start gap-[5px]">
                        <div className="w-96 justify-start text-zinc-900 text-3xl font-semibold font-lexend leading-10">
                            Welcome 👋
                        </div>
                        <div className="w-96 justify-start text-zinc-400 text-base font-light font-lexend leading-normal">
                            Please login here
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-7">
                        <div className="flex flex-col justify-start items-end gap-4">
                            <div className="flex flex-col justify-start items-start gap-5">
                                {/* Email Input */}
                                <div className="w-96 px-4 py-1.5 rounded-[10px] border border-indigo-500 flex flex-col justify-start items-start gap-2.5">
                                    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-px">
                                            <label className="self-stretch justify-start text-indigo-500 text-xs font-light font-lexend leading-none">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="self-stretch justify-start text-zinc-900 text-base font-light font-lexend leading-normal bg-transparent border-none outline-none placeholder-zinc-400"
                                                placeholder="robertallen@example.com"
                                                defaultValue="robertallen@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="w-96 px-4 py-1.5 rounded-[10px] border border-indigo-500 flex flex-col justify-start items-start gap-2.5">
                                    <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-px">
                                            <label className="self-stretch justify-start text-indigo-500 text-xs font-light font-lexend leading-none">
                                                Password
                                            </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="self-stretch justify-start text-zinc-900 text-base font-light font-lexend leading-normal bg-transparent border-none outline-none"
                                                defaultValue="••••••••••••••••"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="w-6 h-6 relative focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-6 h-6 text-zinc-900" />
                                            ) : (
                                                <Eye className="w-6 h-6 text-zinc-900" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="self-stretch inline-flex justify-start items-center gap-36">
                                <div className="pr-4 flex justify-center items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setRememberMe(!rememberMe)}
                                        className={`w-6 h-6 relative rounded flex items-center justify-center ${rememberMe ? 'bg-indigo-500' : 'bg-gray-200'
                                            }`}
                                    >
                                        {rememberMe && (
                                            <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                    <div className="justify-start text-zinc-900 text-base font-light font-lexend leading-normal">
                                        Remember Me
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="text-right justify-start text-indigo-500 text-sm font-light font-lexend leading-snug hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-96 h-14 p-5 bg-indigo-500 rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-indigo-600 transition-colors"
                        >
                            <div className="justify-start text-white text-base font-light font-lexend leading-normal">
                                Login
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
