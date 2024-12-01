import React from "react";

const AgencyProfileContent = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Agency Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agency Clients */}
                <div className="bg-white p-6 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Agency Clients</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Client Name</th>
                                <th className="border border-gray-300 px-4 py-2">Client Reg.No</th>
                                <th className="border border-gray-300 px-4 py-2">Contact Person</th>
                                <th className="border border-gray-300 px-4 py-2">Edit</th>
                                <th className="border border-gray-300 px-4 py-2">Manage Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Excompany</td>
                                <td className="border border-gray-300 px-4 py-2">99999999</td>
                                <td className="border border-gray-300 px-4 py-2">Name NAME</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Edit</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Manage</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Manage Access */}
                <div className="bg-white p-6 col-span-2 2xl:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Manage Access</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Accept</th>
                                <th className="border border-gray-300 px-4 py-2">Deny</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">USERNAME</td>
                                <td className="border border-gray-300 px-4 py-2">Email@mail.email</td>
                                <td className="border border-gray-300 px-4 py-2">Phone</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Make Admin</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Make User</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Invite Existing User to Agency */}
                <div className="bg-white p-6 rounded col-span-2 2xl:col-span-1 shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Invite Existing User to Agency</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">Phone Number</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                            <label className="text-gray-600">Agency Admin</label>
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Invite User</button>
                        </div>
                    </form>
                </div>

                {/* Agency Requests */}
                <div className="bg-white p-6 col-span-2 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Agency Requests</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Accept</th>
                                <th className="border border-gray-300 px-4 py-2">Deny</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">USERNAME</td>
                                <td className="border border-gray-300 px-4 py-2">Email@mail.email</td>
                                <td className="border border-gray-300 px-4 py-2">Phone</td>
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

                {/* Agency Users */}
                <div className="bg-white p-6 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Agency Users</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Agency Admin</th>
                                <th className="border border-gray-300 px-4 py-2">Remove Access</th>
                                <th className="border border-gray-300 px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">ExName</td>
                                <td className="border border-gray-300 px-4 py-2">Email</td>
                                <td className="border border-gray-300 px-4 py-2">12312312</td>
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

                {/* Agency Company Details */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Agency Company Details</h2>
                    <p className="text-gray-600 mb-4">
                        Select agency as client and go to company information to edit details.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Company Details</button>
                </div>
            </div>
        </div>
    );
};

export default AgencyProfileContent;
