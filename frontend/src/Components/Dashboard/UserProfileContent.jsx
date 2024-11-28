import React from "react";

const UserProfileContent = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6">User Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Information */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Profile information</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Phone number</label>
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
                        <div>
                            <label className="block text-gray-600 mb-1">Company</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Save changes
                        </button>
                    </form>
                </div>

                {/* Request Access to Company */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Request Access to Company</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">RegNumber</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Request access
                        </button>
                    </form>
                </div>

                {/* Request Access to Agency */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Request Access to Agency</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">RegNumber</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Request access
                        </button>
                    </form>
                </div>

                {/* My Requests */}
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">My Requests</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Company</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Accept</th>
                                <th className="border border-gray-300 px-4 py-2">Deny</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Company</td>
                                <td className="border border-gray-300 px-4 py-2">Admin</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                        Accept
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* My Clients */}
                <div className="bg-white p-6 rounded col-span-2 2xl:col-span-1 shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">My Clients</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Client Name</th>
                                <th className="border border-gray-300 px-4 py-2">Client Reg.No</th>
                                <th className="border border-gray-300 px-4 py-2">ContactPerson</th>
                                <th className="border border-gray-300 px-4 py-2">Edit</th>
                                <th className="border border-gray-300 px-4 py-2">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Excompany</td>
                                <td className="border border-gray-300 px-4 py-2">99999999</td>
                                <td className="border border-gray-300 px-4 py-2">Name NAME</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                        Edit
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Delete User */}
                <div className="bg-white p-6 col-span-2 2xl:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Delete My User</h2>
                    <p className="text-gray-600 mb-4">
                        This will delete all your data. The only data that will not be deleted is
                        your name in created customers.
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Delete User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileContent;
