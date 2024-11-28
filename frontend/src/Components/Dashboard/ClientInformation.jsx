import React from "react";

const ClientInformation = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Company Information */}
                <div className="bg-white p-4 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Company Information</h2>
                    <form className="space-y-2">
                        {["Name", "RegNumber", "Address", "PostNO", "PostalName", "ContactEmail"].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                            </div>
                        ))}
                    </form>
                </div>

                {/* Request Connection to Agency */}
                <div className="bg-white p-4 flex flex-col justify-between  rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Request Connection to Agency</h2>
                    <form className="space-y-2">
                        {["RegNumber", "Name"].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                            </div>
                        ))}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                            Request Connection
                        </button>
                    </form>
                </div>

                {/* Invite Existing User to Company */}
                <div className="bg-white p-4 col-span-3 lg:col-span-3 xl:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Invite Existing User to Company</h2>
                    <form className="space-y-2">
                        {["Phone Number", "Email"].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                            </div>
                        ))}
                        <p className="text-gray-500">
                            You are inviting <span className="font-bold">NAME OF USER</span>
                        </p>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                            <label className="text-gray-600">Agency Admin</label>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                            Invite User
                        </button>
                    </form>
                </div>

                {/* Company Requests */}
                <div className="bg-white p-4 overflow-x-auto col-span-3 lg:col-span-3 xl:col-span-2 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Company Requests</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {["Name", "Email", "Phone", "Accept", "Deny"].map((header) => (
                                    <th key={header} className="border border-gray-300 px-4 py-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">ExampleName</td>
                                <td className="border border-gray-300 px-4 py-2">example@mail.com</td>
                                <td className="border border-gray-300 px-4 py-2">123456789</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Accept</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Deny</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Users With Access */}
                <div className="bg-white overflow-auto p-4 col-span-3 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Users With Access</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {["Name", "Email", "Phone", "AgencyAdmin", "Remove Access", "Delete"].map((header) => (
                                    <th key={header} className="border border-gray-300 px-4 py-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">ExampleUser</td>
                                <td className="border border-gray-300 px-4 py-2">example@mail.com</td>
                                <td className="border border-gray-300 px-4 py-2">123456789</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Set Base Year */}
                <div className="bg-white p-4 col-span-1 md:col-span-2 lg: rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Set Base Year</h2>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                {/* Remove Agency */}
                <div className="bg-white p-4 col-span-2 md:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Remove Agency</h2>
                    <p className="text-gray-600 mb-2">AgencyName</p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">Remove Agency</button>
                </div>

                {/* Delete Company */}
                <div className="bg-white text-center p-4 col-span-3 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Delete Company</h2>
                    <p className="text-gray-600 mb-4">
                        All data attached to the company will be removed. <br />
                        <strong>This action cannot be reversed.</strong>
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-2/5 ">Delete Data</button>
                </div>
            </div>
        </div>
    );
};

export default ClientInformation;
