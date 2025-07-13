import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="container flex flex-col items-center justify-center max-w-6xl gap-10 mx-auto md:flex-row">
                {/* Image section */}
                <div className="relative hidden w-full md:block md:w-1/2">
                    <div className="p-6 bg-indigo-100 rounded-3xl">
                        <img
                            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt="Office workspace"
                            className="object-cover w-full h-full rounded-2xl"
                        />
                    </div>
                </div>

                {/* Form section */}
                <div className="flex flex-col w-full max-w-md gap-10 md:w-1/2">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center rounded-full w-14 h-14 bg-violet-500">
                            <div className="flex items-center justify-center bg-white rounded-lg w-7 h-7">
                                <span className="text-lg font-bold text-violet-500">C</span>
                            </div>
                        </div>
                        <span className="text-2xl font-semibold text-zinc-900 font-lexend">CRM</span>
                    </div>

                    {/* Welcome */}
                    <div>
                        <h2 className="text-3xl font-semibold text-zinc-900 font-lexend">Welcome 👋</h2>
                        <p className="text-base font-light text-zinc-400 font-lexend">Please login here</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="w-full px-4 py-2 border border-indigo-500 rounded-lg">
                            <label className="block mb-1 text-xs font-light text-indigo-500 font-lexend">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="robertallen@example.com"
                                defaultValue="robertallen@example.com"
                                className="w-full text-base font-light bg-transparent outline-none text-zinc-900 placeholder-zinc-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center w-full px-4 py-2 border border-indigo-500 rounded-lg">
                            <div className="flex-grow">
                                <label className="block mb-1 text-xs font-light text-indigo-500 font-lexend">
                                    Password
                                </label>
                                <input
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

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${rememberMe ? 'bg-indigo-500' : 'bg-gray-200'}`}
                                >
                                    {rememberMe && (
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <span className="text-sm font-light text-zinc-900 font-lexend">Remember Me</span>
                            </div>
                            <button
                                type="button"
                                className="text-sm font-light text-indigo-500 hover:underline font-lexend"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-12 font-light text-white transition-colors bg-indigo-500 rounded-lg hover:bg-indigo-600 font-lexend"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
