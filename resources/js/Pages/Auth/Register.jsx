import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import MainLayout from '@/Layouts/MainLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        number: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (field) => (e) => setData(field, e.target.value);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={submit}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                        Create an Account
                    </h2>

                    {/* First Name */}
                    <div className="mb-4">
                        <InputLabel htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            onChange={handleChange('first_name')}
                            className="mt-1 block w-full text-black"
                            autoComplete="given-name"
                            required
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            onChange={handleChange('last_name')}
                            className="mt-1 block w-full text-black"
                            autoComplete="family-name"
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange('email')}
                            className="mt-1 block w-full text-black"
                            autoComplete="email"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <InputLabel htmlFor="number" value="Phone Number" />
                        <TextInput
                            id="number"
                            type="tel"
                            name="number"
                            value={data.number}
                            onChange={handleChange('number')}
                            className="mt-1 block w-full text-black"
                            autoComplete="tel"
                            required
                        />
                        <InputError message={errors.number} className="mt-2" />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={handleChange('address')}
                            className="mt-1 block w-full text-black"
                            autoComplete="street-address"
                            required
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange('password')}
                            className="mt-1 block w-full text-black"
                            autoComplete="new-password"
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleChange('password_confirmation')}
                            className="mt-1 block w-full text-black"
                            autoComplete="new-password"
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Register Button */}
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Register
                    </PrimaryButton>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <Link href={route('login')} className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}

Register.layout = (page) => <MainLayout>{page}</MainLayout>;
