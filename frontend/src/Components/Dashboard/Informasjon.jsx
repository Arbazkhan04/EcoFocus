import React, { useState, useEffect } from "react";



const Informasjon = () => {
    const [selectedSource, setSelectedSource] = useState("");

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Company Information */}
                <div className="bg-white p-4 rounded shadow-md col-span-2 lg:col-span-3 xl:col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Company Information</h2>
                    <form className="space-y-2">
                        {["Name", "RegNumber", "Address", "PostNO", "PostalName", "ContactEmail"].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="text-center ">
                            <button
                                type="submit"
                                className="w-4/6 mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Promote to Agency
                            </button>
                        </div>
                    </form>
                </div>


                {/* Import Source Selection */}
                <div className="bg-gray-100 col-span-1  lg:col-span-3 xl:col-span-1">
                    <div className="bg-white rounded shadow-md p-6 h-full w-full flex flex-col">
                        {/* Header */}
                        <h1 className="text-xl font-bold text-gray-800 text-center ">
                            Definer Importkilde
                        </h1>

                        {/* Import Source Options */}
                        <div >
                            <div className="my-4">
                                <h2 className="text-md font-semibold text-gray-700 ">Importkilde:</h2>
                            </div>
                            <form className="space-y-4">
                                {[
                                    "Tripletex(pågående aktiv)",
                                    "PowerOffice Go",
                                    "24SevenOffice(pågående aktiv)",
                                    "SAF-T-fil",
                                ].map((label, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={label}
                                            name="import-source"
                                            value={label}
                                            onChange={(e) => setSelectedSource(e.target.value)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label
                                            htmlFor={label}
                                            className="ml-2 text-gray-700 text-sm"
                                        >
                                            {label}
                                        </label>
                                    </div>
                                ))}

                                {/* Conditional Rendering for Tripletex */}
                                {selectedSource === "Tripletex(pågående aktiv)" && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="api-key"
                                            className="block text-gray-700 mb-2 text-sm"
                                        >
                                            Legg inn API-brukernøkkel for autentisering:
                                        </label>
                                        <input
                                            id="api-key"
                                            type="text"
                                            placeholder="Skriv inn API-nøkkel"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                {/* Conditional Rendering for PowerOffice Go */}
                                {selectedSource === "PowerOffice Go" && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="api-key"
                                            className="block text-gray-700 mb-2 text-sm"
                                        >
                                            Legg inn API-brukernøkkel for autentisering:
                                        </label>
                                        <input
                                            id="api-key"
                                            type="text"
                                            placeholder="Skriv inn API-nøkkel"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                {/* Conditional Rendering for 24SevenOffice */}
                                {selectedSource === "24SevenOffice(pågående aktiv)" && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="username"
                                            className="block text-gray-700 mb-2 text-sm"
                                        >
                                            Brukernavn:
                                        </label>
                                        <input
                                            id="username"
                                            type="text"
                                            placeholder="Skriv inn brukernavn"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-700 mt-4 mb-2 text-sm"
                                        >
                                            Passord:
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Skriv inn passord"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                {/* Conditional Rendering for SAF-T-fil */}
                                {selectedSource === "SAF-T-fil" && (
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        Se instruksjoner under hjelp for hvordan opprette API nøkler.
                                    </p>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-end items-center gap-4 mt-6">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Avbryt
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Lagre endringer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



                {/* Request Connection to Agency */}
                <div className="bg-white p-4 rounded col-span-2 lg:col-span-3 shadow-md h-full flex flex-col">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Request Connection to Agency</h2>
                    <form className="flex flex-col justify-between flex-grow">
                        {/* Input Fields */}
                        <div className="space-y-2">
                            {["RegNumber", "Name"].map((label) => (
                                <div key={label}>
                                    <label className="block text-gray-600 mb-1">{label}</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        <div className="mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                                Request Connection
                            </button>
                        </div>
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



                {/* Remove Agency */}
                <div className="bg-white p-4 col-span-2 flex flex-col justify-between rounded shadow-md">
                    <div>
                        <h2 className="text-lg font-bold text-blue-500 mb-4">Remove Agency</h2>
                        <p className="text-gray-600 mb-2">AgencyName</p>
                    </div>
                    <div className="text-center">
                        <button className="bg-red-500 text-white  px-4 py-2 rounded hover:bg-red-600 w-2/6">Remove Agency</button>
                    </div>
                </div>

                {/* Delete Company */}
                <div className="bg-white text-center p-4 col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Delete Company</h2>
                    <p className="text-gray-600 mb-4">
                        All data attached to the company will be removed. <br />
                        <strong>This action cannot be reversed.</strong>
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-2/5 ">Delete Data</button>
                </div>
            </div>
        </div >
    );
};

export default Informasjon;
