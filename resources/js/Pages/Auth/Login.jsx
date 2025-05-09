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
        password: '',
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
            <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-4 text-left">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
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
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </div>

                    <PrimaryButton type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        disabled={processing}>
                        Log in
                    </PrimaryButton>
                </form>

                <div className="mt-4">
                    <Link
                        href={route('password.request')}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>


                <div className="mt-4">
                    <button
                        onClick={() => window.location.href = '/register'}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Don’t have an account? Register
                    </button>
                </div>

            </div>
        </>
    );
}

// You can switch to GuestLayout if preferred
Login.layout = (page) => <MainLayout>{page}</MainLayout>;
// Or: Login.layout = (page) => <GuestLayout>{page}</GuestLayout>;
