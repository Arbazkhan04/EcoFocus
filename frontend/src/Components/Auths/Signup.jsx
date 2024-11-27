import React from 'react';
import logo from '../../assets/logo192.png'; // Replace with your logo path

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="React Logo" className="w-16 h-16" />
                </div>

                {/* Heading */}
                <h1 className="text-center text-xl font-bold text-blue-500 mb-6">
                    Registrer ny bruker
                </h1>

                {/* Form */}
                <form className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Navn:</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Epost:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Passord:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600"
                    >
                        Opprett
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
