import React from "react";

const CreateNewClient = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Create New Client</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {/* Company Information */}
                <div className="bg-white p-4 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Company Information</h2>
                    <form className="space-y-2">
                        {[
                            "Name",
                            "Reg Number",
                            "Address",
                            "Post no.",
                            "Postal Name",
                            "Contact Email",
                            "Set Base Year",
                        ].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        ))}

                        {/* Create New Client Button */}
                        <div className=" text-center ">
                            <button
                                type="submit"
                                className="w-2/6 mt-6 font-bold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Create New Client
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNewClient;
