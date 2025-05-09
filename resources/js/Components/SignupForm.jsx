const SignupForm = () => {
    return (
        <div className="bg-white p-4 rounded shadow-lg mt-4">
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <form className="mt-4">
                <input className="border border-gray-300 p-2 w-full mb-3" placeholder="First Name" />
                <input className="border border-gray-300 p-2 w-full mb-3" placeholder="Last Name" />
                <input className="border border-gray-300 p-2 w-full mb-3" type="email" placeholder="Email" />
                <input className="border border-gray-300 p-2 w-full mb-3" placeholder="Number" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default SignupForm;
