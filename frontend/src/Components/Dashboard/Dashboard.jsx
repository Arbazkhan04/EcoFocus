import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage"; // Home page content
import UserProfileContent from "./UserProfileContent"; // User Profile content
import AgencyProfileContent from "./AgencyProfileContent";

const Dashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const location = useLocation();

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


    // Generate breadcrumbs
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split("/").filter((x) => x);

        // Avoid displaying "Dashboard" twice
        const filteredPathnames = pathnames.filter((path, index) => !(path === "dashboard" && index !== 0));

        return (
            <div className="text-sm text-blue-500 font-semibold flex items-center space-x-2">
                {filteredPathnames.map((value, index) => {
                    const to = `/${filteredPathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === filteredPathnames.length - 1;
                    return (
                        <span key={to} className="flex items-center">
                            {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                            {isLast ? (
                                <span className="text-gray-800">
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </span>
                            ) : (
                                <Link to={to} className="hover:underline">
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </div>
        );
    };

    const topNavigationLinks = [
        { label: "Dashboard", icon: "ri-home-line", path: "/dashboard" },
        { label: "Informasjon", icon: "ri-information-line", path: "/dashboard/informasjon" },
        { label: "Importer", icon: "ri-file-upload-line", path: "/dashboard/importer" },
        { label: "Grunnlagsdata", icon: "ri-database-2-line", path: "/dashboard/grunnlagsdata" },
        { label: "Rapporter", icon: "ri-file-chart-line", path: "/dashboard/rapporter" },
    ];

    const bottomNavigationLinks = [
        { label: "Agency Profile", icon: "ri-user-line", path: "/dashboard/agency-profile" },
        { label: "User Profile", icon: "ri-user-2-line", path: "/dashboard/user-profile" },
        { label: "ModPanel", icon: "ri-settings-2-line", path: "/dashboard/mod-panel" },
        { label: "AdminPanel", icon: "ri-shield-user-line", path: "/dashboard/admin-panel" },
        { label: "Logg av", icon: "ri-logout-circle-line", path: "/dashboard/logout", color: "text-red-600 hover:text-red-800" },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white shadow-md min-h-screen transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"
                    } flex flex-col`}
            >
                {/* Logo and Toggle */}
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
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
                            className={`ri-${isSidebarCollapsed ? "menu-unfold" : "menu-fold"}-line text-xl`}
                        ></i>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col justify-between flex-grow">
                    {/* Top Section */}
                    <div className="p-4 space-y-4 sticky top-12">
                        {topNavigationLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
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
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="p-4 space-y-4 sticky bottom-0 bg-white">
                        {bottomNavigationLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
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
                            </Link>
                        ))}
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col transition-all duration-300">
                {/* Header */}
                <header className="w-full bg-white shadow p-4 flex justify-between items-center">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-blue-500 font-semibold">
                        <div className="flex items-center space-x-2">
                            {generateBreadcrumbs()}
                        </div>
                    </div>

                    {/* Header Controls */}
                    <div className="flex items-center space-x-4">
                        <i className="ri-notification-line text-2xl text-gray-500 cursor-pointer"></i>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Synkroniser Data</button>
                        <div className="flex items-center space-x-4">
                            <select className="border border-gray-300 rounded px-3 py-2 bg-white">
                                <option value="ClientName">ClientName</option>
                                <option value="Client1">Client1</option>
                            </select>
                            <select className="border border-gray-300 rounded px-3 py-2 bg-white">
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Opprett ny Klient</button>
                        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300">Hjelp</button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardHomePage />} />
                        <Route path="/user-profile" element={<UserProfileContent />} />
                        <Route path="/agency-profile" element={<AgencyProfileContent />} />
                        <Route path="/dashboard/informasjon" element={<div>Informasjon Page</div>} />
                        <Route path="/dashboard/importer" element={<div>Importer Page</div>} />
                        <Route path="/dashboard/grunnlagsdata" element={<div>Grunnlagsdata Page</div>} />
                        <Route path="/dashboard/rapporter" element={<div>Rapporter Page</div>} />
                        <Route path="/dashboard/mod-panel" element={<div>ModPanel Page</div>} />
                        <Route path="/dashboard/admin-panel" element={<div>AdminPanel Page</div>} />
                        <Route path="/dashboard/logout" element={<div>Logout Page</div>} />
                        <Route path="/" element={<DashboardHomePage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
