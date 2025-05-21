import React from 'react';
import MainLayout from '@/Layouts/MainLayout'; // or use GuestLayout
import { Link, Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center  px-4">
                <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-neu-glass max-w-md w-full border border-white/30">
                    <h2 className="text-3xl font-bold mb-6 text-center text-[#0b2545] drop-shadow-sm">Login</h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl bg-white/30 text-[#0b2545] placeholder-gray-400 backdrop-blur-sm shadow-neu-input border border-white/20"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl bg-white/30 text-[#0b2545] placeholder-gray-400 backdrop-blur-sm shadow-neu-input border border-white/20"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </div>

                        <button
                            className="w-full shadow-neu-button hover:shadow-neu-button-hover bg-blue-950 text-white py-2 rounded-xl transition backdrop-blur-sm"
                            disabled={processing}
                        >
                            Log in
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link
                            href={route('password.request')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={() => window.location.href = '/register'}
                            className="w-full shadow-neu-button hover:shadow-neu-button-hover bg-[#e0e5ec] text-[#0b2545] py-2 rounded-xl transition backdrop-blur-sm"
                        >
                            Don’t have an account? Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = (page) => <MainLayout>{page}</MainLayout>;
