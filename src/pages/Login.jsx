import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import InputFieldAuth from '../components/Form/InputFieldAuth';
import InputFieldPW from '../components/Form/InputFieldPW';
import WalletConnector from '../components/wallet/WalletConnector';
import { authenticateUser } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
// import { authenticateUser } from '../utils/mockData';

const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form handling
    const loginForm = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await loginForm.trigger();
        if (!isValid) return;

        try {
            // Get form values
            const formData = loginForm.getValues();

            // Authenticate user
            const response = await authenticateUser(formData);
            console.log("Res", response)
            console.log(response.data.success, response.data.data)
            if (response.data.success && response.data.data) {
                const userData = response.data.data;
                const token = response.data.data.token;

                // Use AuthContext login method
                login(userData, token);

                // Redirect based on user role
                if (userData.role === 'employee') {
                    navigate('/employee/dashboard');
                } else if (userData.role === 'accounting') {
                    navigate('/accounting/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                // Show error message
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleWalletConnect = (walletInfo) => {
        console.log('Wallet connected:', walletInfo);
        // For demo, just redirect to dashboard
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
                        {/* <div className="w-full px-4 py-2 border border-indigo-500 rounded-lg">
                            <label className="block mb-1 text-xs font-light text-indigo-500 font-lexend">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="robertallen@example.com"
                                defaultValue="robertallen@example.com"
                                className="w-full text-base font-light bg-transparent outline-none text-zinc-900 placeholder-zinc-400"
                            />
                        </div> */}

                        <InputFieldAuth
                            label="Email Address"
                            placeholder="robertallen@example.com"
                            type="email"
                            {...loginForm.register('email')}
                            error={loginForm.formState.errors.email?.message}
                        />

                        {/* Password */}
                        <InputFieldPW
                            label="Password"
                            placeholder="Enter your password"
                            defaultValues="123456789"
                            {...loginForm.register('password')}
                            error={loginForm.formState.errors.password?.message}
                        />

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

                        {/* OR divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <div className="mx-4 text-sm text-gray-500 font-lexend">OR</div>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Wallet Connection */}
                        <WalletConnector
                            onConnect={handleWalletConnect}
                            className="justify-center w-full"
                        />

                        {/* Demo Account Info */}
                        <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
                            <h4 className="mb-2 font-semibold text-blue-800 font-lexend">Demo Accounts:</h4>
                            <div className="space-y-1 text-sm text-blue-700 font-lexend">
                                <div><strong>Employee:</strong> john.smith.employee@company.com / password123</div>
                                <div><strong>Accounting:</strong> lisa.anderson.accounting@company.com / password123</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
