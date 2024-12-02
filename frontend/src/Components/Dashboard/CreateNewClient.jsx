import { useState } from "react";

const CreateNewClient = () => {
    const [selectedSource, setSelectedSource] = useState("");

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">
                Create New Client
            </h1>

            <div className="bg-white p-6 rounded shadow-md max-w-6xl mx-auto">
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Company Information Section */}
                    <div>
                        <h2 className="text-lg font-bold text-blue-500 mb-4">
                            Company Information
                        </h2>
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
                                <label className="block text-gray-600 mb-1">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Import Source Selection Section */}
                    <div>
                        <h2 className="text-lg font-bold text-blue-500 mb-4">
                            Definer Importkilde
                        </h2>
                        <div className="space-y-4">
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
                                        onChange={(e) =>
                                            setSelectedSource(e.target.value)
                                        }
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

                            {/* Conditional Fields */}
                            {selectedSource ===
                                "Tripletex(pågående aktiv)" && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="api-key"
                                            className="block text-gray-700 mb-2 text-sm"
                                        >
                                            Legg inn API-brukernøkkel for
                                            autentisering:
                                        </label>
                                        <input
                                            id="api-key"
                                            type="text"
                                            placeholder="Skriv inn API-nøkkel"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                )}

                            {selectedSource === "PowerOffice Go" && (
                                <div className="mt-4">
                                    <label
                                        htmlFor="api-key"
                                        className="block text-gray-700 mb-2 text-sm"
                                    >
                                        Legg inn API-brukernøkkel for
                                        autentisering:
                                    </label>
                                    <input
                                        id="api-key"
                                        type="text"
                                        placeholder="Skriv inn API-nøkkel"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )}

                            {selectedSource ===
                                "24SevenOffice(pågående aktiv)" && (
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

                            {selectedSource === "SAF-T-fil" && (
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    Se instruksjoner under hjelp for hvordan
                                    opprette API nøkler.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="lg:col-span-2 text-center w-full mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 w-2/6 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Create New Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewClient;
