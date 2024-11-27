import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/logo192.png'; // Replace with the correct path to your React logo

const Login = () => {
    const navigate = useNavigate(); // Initialize the navigation hook

    const handleLoginClick = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        navigate('/dashboard'); // Redirect to the desired route, e.g., /dashboard
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Redirect to the register page
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="React Logo" className="w-16 h-16" />
                    <h1 className='ms-5'>React</h1>
                </div>

                {/* Heading */}
                <div className='text-center'>
                    <h1 className="text-xl font-bold text-blue-500 mb-6">
                        Logg inn
                    </h1>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Epost:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Passord:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleLoginClick} // Trigger navigation on click
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600"
                    >
                        Logg inn
                    </button>
                </form>

                {/* Register Button */}
                <div className="mt-4">
                    <button
                        onClick={handleRegisterClick} // Redirect to register page
                        className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600"
                    >
                        Opprett ny bruker
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
