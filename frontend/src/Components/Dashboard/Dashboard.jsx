import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import DashboardHomePage from "./DashboardHomePage"; // Home page content
import UserProfileContent from "./UserProfileContent"; // User Profile content
import AgencyProfileContent from "./AgencyProfileContent";
import Informasjon from "./Informasjon";
import CreateNewClient from "./CreateNewClient";
import NotificationModal from "./notificationModal";
import { getCompanies, getCompany } from '../../apiManager/company'
import ProtectedRoute from "../Common/protectedRoute";
import {  setCompanyInStore, clearSelectionsFromStore } from "../../slices/appStateSlice";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {

    // state management
    const dispatch = useDispatch();
    const { company } = useSelector((state) => state.appState);


    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isGrunnlagsdataOpen, setIsGrunnlagsdataOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(company?.name || "");
    const [filteredYears, setFilteredYears] = useState([]); // 
    const [selectedYear, setSelectedYear] = useState(company?.setBaseYear || "");
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { userId, role } = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getCompanies(userId);
                if (res.data) {
                    const clientData = res.data.map((company) => ({
                        name: company.name,
                        years: company.setBaseYear || [],
                    }));
                    setClients(clientData);
                    setFilteredClients(clientData.map((client) => client.name));
                }
            } catch (error) {
                console.error("Error fetching companies:", error.message);
            }
        };

        fetchCompanies();
    }, [userId]);

    const handleClientSearch = (e) => {
        const searchValue = e.target.value.trim();
        setSelectedClient(searchValue);

        // Filter clients based on search value
        const filteredClientsList = clients
            .map((client) => client.name)
            .filter((name) => name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredClients(filteredClientsList);

        // Update filteredYears if a valid client is selected
        const clientData = clients.find(
            (client) => client.name.toLowerCase() === searchValue.toLowerCase()
        );
        setFilteredYears(clientData ? clientData.years : []);
    };

    const handleYearSearch = (e) => {
        const searchValue = e.target.value.trim();
        setSelectedYear(searchValue);

        // Filter years based on search value
        if (selectedClient) {
            const clientData = clients.find(
                (client) => client.name.toLowerCase() === selectedClient.toLowerCase()
            );
            const years = clientData ? clientData.years : [];
            const filtered = years.filter((year) =>
                year.toString().includes(searchValue)
            );
            setFilteredYears(filtered);
        }
    };

    // get compnay data based on the selected client and year
    useEffect(() => {
        // check the selected client and year exist in the setClients
        if (!selectedClient || !selectedYear) {
            return;
        }

        const clientExists = clients.some(
            (client) => client.name.toLowerCase() === selectedClient.toLowerCase()
        );

        if (!clientExists) {
            // setError("Selected client does not exist");
            return;
        }

        const yearExists = clients
            .find((client) => client.name.toLowerCase() === selectedClient.toLowerCase())
            ?.years.includes(parseInt(selectedYear));

        if (!yearExists) {
            // setError("Selected year does not exist for the selected client");
            return;
        }




        const fetchCompanyData = async () => {
            setLoading(true);
            try {
                const res = await getCompany(selectedClient, selectedYear, userId);
                if (!res.data) {
                    // clear the company data in the store as well if not data found
                    dispatch(clearSelectionsFromStore());
                    setError(res.message || "No data found for the selected client and year");
                    return;
                }
                console.log(res.data);

                // Extract only the fields you want to store
                const companyDataToStore = {
                    _id: res.data._id,
                    name: res.data.name,
                    registrationNumber: res.data.registrationNumber,
                    isAgency: res.data.isAgency,
                    isCompanyAdmin: res.data.isCompanyAdmin,
                    setBaseYear: selectedYear, // store the selected year
                    user: res.data.user,
                    contactPerson: res.data.contactPerson,
                    agencyId: res.data.agencyId,
                };
              
                // only store the selected company data
                dispatch(setCompanyInStore(companyDataToStore));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [selectedClient, selectedYear]);



    const handleAccept = (id) => {
        console.log(`Accepted notification with ID: ${id}`);
        // Add API call logic here if needed
    };

    const handleDecline = (id) => {
        console.log(`Declined notification with ID: ${id}`);
        // Add API call logic here if needed
    };



    // Function to handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Check for screen size and adjust sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1500) {
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


    const clearCompanyData = () => {
        dispatch(clearSelectionsFromStore());
        setSelectedClient("");
        setSelectedYear("");
        setFilteredYears([]);
        setFilteredClients(clients);
    }

    // // Generate breadcrumbs
    // const generateBreadcrumbs = () => {
    //     const pathnames = location.pathname.split("/").filter((x) => x);

    //     // Avoid displaying "Dashboard" twice
    //     const filteredPathnames = pathnames.filter((path, index) => !(path === "dashboard" && index !== 0));

    //     return (
    //         <div className="text-sm text-blue-500 font-semibold flex items-center space-x-2">
    //             {filteredPathnames.map((value, index) => {
    //                 const to = `/${filteredPathnames.slice(0, index + 1).join("/")}`;
    //                 const isLast = index === filteredPathnames.length - 1;
    //                 return (
    //                     <span key={to} className="flex items-center">
    //                         {index > 0 && <span className="text-gray-400 mx-2">/</span>}
    //                         {isLast ? (
    //                             <span className="text-gray-800">
    //                                 {value.charAt(0).toUpperCase() + value.slice(1)}
    //                             </span>
    //                         ) : (
    //                             <Link to={to} className="hover:underline">
    //                                 {value.charAt(0).toUpperCase() + value.slice(1)}
    //                             </Link>
    //                         )}
    //                     </span>
    //                 );
    //             })}
    //         </div>
    //     );
    // };

    const topNavigationLinks = [
        { label: "Dashboard", icon: "ri-dashboard-line", path: "/dashboard" },
        { label: "Informasjon", icon: "ri-information-line", path: "/dashboard/informasjon" },
        { label: "Importer", icon: "ri-file-upload-line", path: "/dashboard/importer" },
        {
            label: "Grunnlagsdata",
            icon: "ri-database-2-line",
            submenu: [
                { label: "Submenu 1", path: "/dashboard/grunnlagsdata/submenu1" },
                { label: "Submenu 2", path: "/dashboard/grunnlagsdata/submenu2" },
            ],
        }, ,
        { label: "Rapporter", icon: "ri-file-chart-line", path: "/dashboard/rapporter" },
    ];


    // const bottomNavigationLinks = [
    //     { label: "Agency Profile", icon: "ri-user-line", path: "/dashboard/agency-profile" },
    //     { label: "User Profile", icon: "ri-user-2-line", path: "/dashboard/user-profile" },
    //     { label: "ModPanel", icon: "ri-settings-2-line", path: "/dashboard/mod-panel" },
    //     { label: "AdminPanel", icon: "ri-shield-user-line", path: "/dashboard/admin-panel" },
    //     { label: "Logg av", icon: "ri-logout-circle-line", path: "/dashboard/logout", color: "text-red-600 hover:text-red-800" },
    // ];

    const bottomNavigationLinks = [
        { label: "Agency Profile", icon: "ri-user-line", path: "/dashboard/agency-profile" },
        { label: "User Profile", icon: "ri-user-2-line", path: "/dashboard/user-profile" },
        ...(role === "super-admin" || role === "mod"
            ? [{ label: "ModPanel", icon: "ri-settings-2-line", path: "/dashboard/mod-panel" }]
            : []),
        ...(role === "super-admin"
            ? [{ label: "AdminPanel", icon: "ri-shield-user-line", path: "/dashboard/admin-panel" }]
            : []),
        { label: "Logg av", icon: "ri-logout-circle-line", path: "/dashboard/logout", color: "text-red-600 hover:text-red-800" },
    ];


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

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
                        {topNavigationLinks.map((item, index) =>
                            item.submenu ? (
                                <div key={index}>
                                    <button
                                        onClick={() => setIsGrunnlagsdataOpen(!isGrunnlagsdataOpen)}
                                        className="flex items-center text-gray-700 hover:text-blue-500 w-full"
                                    >
                                        <i className={`${item.icon} text-xl`}></i>
                                        <span className={`ml-2 ${isSidebarCollapsed ? "hidden" : "inline"}`}>
                                            {item.label}
                                        </span>
                                        <i
                                            className={`ml-auto ri-arrow-${isGrunnlagsdataOpen ? "up" : "down"}-s-line`}
                                        ></i>
                                    </button>
                                    {isGrunnlagsdataOpen && !isSidebarCollapsed && (
                                        <div className="ml-8 mt-2 space-y-2">
                                            {item.submenu.map((submenuItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={submenuItem.path}
                                                    className="block text-gray-700 hover:text-blue-500"
                                                >
                                                    {submenuItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`flex items-center ${item.color || "text-gray-700 hover:text-blue-500"
                                        }`}
                                >
                                    <i className={`${item.icon} text-xl`}></i>
                                    <span className={`ml-2 ${isSidebarCollapsed ? "hidden" : "inline"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            )
                        )}
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
                    {/* <div className="flex items-center text-sm text-blue-500 font-semibold">
                        <div className="flex items-center space-x-2">
                            {generateBreadcrumbs()}
                        </div>
                    </div> */}

                    {/* Header Controls */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {/* Notification Icon */}
                            <i
                                className="ri-notification-line text-2xl text-gray-500 cursor-pointer"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            ></i>

                            {/* Notification Dropdown */}
                            {isNotificationOpen && (
                                <NotificationModal
                                    isOpen={isNotificationOpen}
                                    onClose={() => setIsNotificationOpen(false)}
                                    notifications={notifications}
                                    handleAccept={handleAccept}
                                    handleDecline={handleDecline}
                                />
                            )}
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Synkroniser</button>
                        <div className="flex items-center space-x-4">

                            {/* Client Dropdown */}
                            <div className="relative">
                                <input
                                    id="client"
                                    type="text"
                                    value={selectedClient}
                                    onChange={handleClientSearch}
                                    onFocus={() => setIsClientDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setIsClientDropdownOpen(false), 200)}
                                    className="appearance-none border border-gray-300 rounded px-3 py-2 bg-white w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search Client"
                                />
                                <i className="ri-arrow-down-s-fill absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                {isClientDropdownOpen && (
                                    <div className="absolute left-0 right-0 border border-gray-300 rounded mt-1 bg-white max-h-40 overflow-y-auto z-10">
                                        {filteredClients.map((client, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedClient(client);
                                                    const selectedClientData = clients.find(
                                                        (c) => c.name === client
                                                    );
                                                    setFilteredYears(selectedClientData?.years || []);
                                                    setFilteredClients(clients.map((c) => c.name)); // Reset dropdown
                                                    setIsClientDropdownOpen(false);
                                                }}
                                            >
                                                {client}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>


                            {/* Year Dropdown */}
                            <div className="relative">
                                <input
                                    id="year"
                                    type="text"
                                    value={selectedYear}
                                    onChange={handleYearSearch}
                                    onFocus={() => setIsYearDropdownOpen(true)}
                                    onBlur={(e) => {
                                        if (!e.relatedTarget || !e.relatedTarget.classList.contains('dropdown-item')) {
                                            setTimeout(() => setIsYearDropdownOpen(false), 200);
                                        }
                                    }}
                                    className="appearance-none border border-gray-300 rounded px-3 py-2 bg-white w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search Year"
                                />
                                <i className="ri-arrow-down-s-fill absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                {isYearDropdownOpen && (
                                    <div className="absolute left-0 right-0 border border-gray-300 rounded mt-1 bg-white max-h-40 overflow-y-auto z-10">
                                        {filteredYears.map((year, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setIsYearDropdownOpen(false);
                                                }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>



                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={clearCompanyData}>
                            Clear
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate("/dashboard/create-new-client")}>
                            Opprett ny Klient
                        </button>
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-300">Hjelp</button>

                        {/* Dropdown Button */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-blue-100 text-blue-600 py-1 px-2  rounded hover:bg-gray-300 flex items-center"
                            >
                                <i class="ri-arrow-down-s-fill"></i>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <ul>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                Selected Client
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                Selected Year
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                Logged-in user
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                User Role
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                ImportKilde
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                                Agency Registration Number
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardHomePage />} />
                        <Route path="/user-profile" element={<ProtectedRoute hasAccess={role === 'user' ? true : false}><UserProfileContent /></ProtectedRoute>} />
                        <Route path="/agency-profile" element={<ProtectedRoute hasAccess={company?.isAgency}><AgencyProfileContent /></ProtectedRoute>} />
                        <Route path="/informasjon" element={<ProtectedRoute hasAccess={company?.isCompanyAdmin}><Informasjon /></ProtectedRoute>} />
                        <Route path="/create-new-client" element={<CreateNewClient />} />
                        <Route path="/importer" element={<div>Importer Page</div>} />
                        <Route path="/grunnlagsdata" element={<div>Grunnlagsdata Page</div>} />
                        <Route path="/rapporter" element={<div>Rapporter Page</div>} />
                        <Route path="/mod-panel" element={<ProtectedRoute hasAccess={(role === 'super-admin' || role === 'mod') ? true : false} ><div>ModPanel Page</div></ProtectedRoute>} />
                        <Route path="/admin-panel" element={<ProtectedRoute hasAccess={role === 'super-admin' ? true : false}><div>AdminPanel Page</div></ProtectedRoute>} />
                        <Route path="/logout" element={<div>Logout Page</div>} />
                        <Route path="/" element={<DashboardHomePage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;




