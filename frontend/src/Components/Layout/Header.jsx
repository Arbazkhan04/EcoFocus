import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-md flex justify-between items-center px-6 py-4">
            {/* Left Section */}
            <div>
                <a href="#" className="text-blue-500 hover:underline font-medium">
                    Home
                </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <i className="ri-notification-3-line text-gray-500 text-xl"></i>

                {/* Sync Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Synkroniser Data
                </button>

                {/* Client Dropdown */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">ClientName</span>
                    <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Client1</option>
                        <option>Client2</option>
                    </select>
                </div>

                {/* Year Dropdown */}
                <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>2024</option>
                    <option>2023</option>
                </select>

                {/* Create Client Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Opprett ny Klient
                </button>

                {/* Help Button */}
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                    Hjelp
                </button>

                {/* Dropdown Icon */}
                <div className="relative">
                    <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-300">
                        <i className="ri-arrow-down-s-line"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
