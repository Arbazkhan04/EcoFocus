import React, { useState, useEffect } from "react";

const Dashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Function to handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Check for screen size and adjust sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsSmallScreen(true);
                setIsSidebarCollapsed(true); // Automatically collapse sidebar on small screens
            } else {
                setIsSmallScreen(false);
                setIsSidebarCollapsed(false); // Expand sidebar on large screens
            }
        };

        handleResize(); // Run on component mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-md min-h-screen transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"
                    } flex flex-col`}
            >
                {/* Logo and Toggle */}
                <div className="p-4 border-b flex items-center justify-between">
                    <span
                        className={`text-lg font-bold text-gray-800 ${isSidebarCollapsed ? "hidden" : "block"
                            }`}
                    >
                        LOGO
                    </span>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                    >
                        <i
                            className={`ri-${isSidebarCollapsed ? "menu-unfold" : "menu-fold"
                                }-line text-xl`}
                        ></i>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow p-4 space-y-4">
                    {[
                        { icon: "ri-home-line", label: "Dashboard" },
                        { icon: "ri-information-line", label: "Informasjon" },
                        { icon: "ri-file-upload-line", label: "Importer" },
                        { icon: "ri-database-2-line", label: "Grunnlagsdata" },
                        { icon: "ri-file-chart-line", label: "Rapporter" },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className="flex items-center text-gray-700 hover:text-blue-500"
                        >
                            <i className={`${item.icon} text-xl`}></i>
                            <span
                                className={`ml-2 ${isSidebarCollapsed ? "hidden" : "inline"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </a>
                    ))}
                </nav>

                {/* Footer Links */}
                <div className="p-4 border-t space-y-4">
                    {[
                        { icon: "ri-user-line", label: "AgencyProfile" },
                        { icon: "ri-user-2-line", label: "UserProfile" },
                        { icon: "ri-settings-2-line", label: "ModPanel" },
                        { icon: "ri-shield-user-line", label: "AdminPanel" },
                        { icon: "ri-logout-circle-line", label: "Logg av", color: "text-red-600 hover:text-red-800" },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`flex items-center ${item.color || "text-gray-700 hover:text-blue-500"
                                }`}
                        >
                            <i className={`${item.icon} text-xl`}></i>
                            <span
                                className={`ml-2 ${isSidebarCollapsed ? "hidden" : "inline"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300`}
            >
                {/* Header */}
                <header className="w-full bg-white shadow p-4 flex justify-between items-center">
                    <div className="text-blue-500 font-bold">Dashboard</div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Synkroniser Data
                        </button>
                        <select className="border border-gray-300 rounded px-3 py-2">
                            <option>ClientName</option>
                        </select>
                        <select className="border border-gray-300 rounded px-3 py-2">
                            <option>2024</option>
                        </select>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Opprett ny Klient
                        </button>
                        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300">
                            Hjelp
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        {/* Steps Section */}
                        <div className="lg:col-span-7 md:col-span-2 col-span-1 space-y-6">
                            {[
                                {
                                    step: "STEP 1",
                                    description: "OPPRETT NY KLIENT OG KLARGJØR FOR IMPORT AV DATA.",
                                    action: "Opprett ny Klient",
                                },
                                {
                                    step: "STEP 2",
                                    description: "VELG IMPORTKILDE, KONTROLLER OG IMPORTER DATA.",
                                    action: "Gå til Import",
                                },
                                {
                                    step: "STEP 3",
                                    description: "JOBB MED DATAINNSAMLING OG FORBEDRING AV DATAKILDER.",
                                    action: "Gå til Grunnlagsdata",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white shadow-md border-2 border-blue-500 rounded"
                                >
                                    <h2 className="text-blue-500 font-bold text-lg mb-4">
                                        {item.step}
                                    </h2>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        {item.action}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Image Section */}
                        <div className="lg:col-span-5 md:col-span-2 col-span-1 flex justify-center items-center">
                            <div className="bg-gray-300 border border-gray-400 w-full h-64 flex justify-center items-center">
                                <i className="ri-image-line text-gray-500 text-6xl"></i>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
