import { Link } from '@inertiajs/react';

const Logo = ({ size = 48 }) => {
    return (
        <div className="relative" style={{ width: size, height: size }}>
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-500 rounded-full"
                style={{ width: size, height: size }}
            ></div>
            <div
                className="absolute inset-0 border-4 border-white rounded-full flex items-center justify-center overflow-hidden"
                style={{ width: size, height: size }}
            >
                <img
                    src="/images/logo.png"  // <- Correct path relative to the public folder
                    alt="Logo"
                    className="object-cover"
                    style={{ width: size * 0.6, height: size * 0.6 }}
                />
            </div>
        </div>
    );
};

export default Logo;
