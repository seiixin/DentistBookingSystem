import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';  

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
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            onChange={(e) => setData('first_name', e.target.value)}
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
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('last_name', e.target.value)}
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
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Number */}
                    <div className="mb-4">
                        <InputLabel htmlFor="number" value="Phone Number" />
                        <TextInput
                            id="number"
                            type="tel"
                            name="number"
                            value={data.number}
                            className="mt-1 block w-full"
                            autoComplete="tel"
                            onChange={(e) => setData('number', e.target.value)}
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
                            className="mt-1 block w-full"
                            autoComplete="street-address"
                            onChange={(e) => setData('address', e.target.value)}
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
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
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
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Register Button */}
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
Register.layout = (page) => <MainLayout>{page}</MainLayout>;
