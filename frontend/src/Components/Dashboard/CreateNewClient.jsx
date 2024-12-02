import { useState } from "react";
import { createCompany } from "../../apiManager/company" // Import the API method
import { useSelector } from "react-redux";

const CreateNewClient = () => {
    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        address: "",
        postNo: "",
        postalName: "",
        contactEmail: "",
        baseYear: [], // Change from a single value to an array
        source: "",
        apiKey: "",
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    // Get the user ID from the Redux store
    const userId = useSelector((state) => state.auth.userInfo.userId);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "baseYear") {
            // Ensure the value is stored as an array
            setFormData({ ...formData, [name]: [value] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // General fields validation
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.postNo) newErrors.postNo = "Post number is required";
        if (!formData.postalName) newErrors.postalName = "Postal name is required";
        if (!formData.contactEmail) {
            newErrors.contactEmail = "Contact email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
            newErrors.contactEmail = "Enter a valid email address";
        }
        // Base Year Validation
    if (!formData.baseYear.length || !/^\d{4}$/.test(formData.baseYear[0])) {
        newErrors.baseYear = "Base year must be a valid 4-digit number";
    }

        // Import source validation
        if (!formData.source) newErrors.source = "Import source is required";

        if (formData.source === "Tripletex(pågående aktiv)" || formData.source === "PowerOffice Go") {
            if (!formData.apiKey) newErrors.apiKey = "API Key is required for this source";
        }

        if (formData.source === "24SevenOffice(pågående aktiv)") {
            if (!formData.username) newErrors.username = "Username is required";
            if (!formData.password) newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const companyData = {
            name: formData.name,
            registrationNumber: formData.registrationNumber,
            source: formData.source,
            apiKey: formData.apiKey,
            username: formData.username,
            password: formData.password,
            address: formData.address,
            postalCode: formData.postNo,
            postalName: formData.postalName,
            contactEmail: formData.contactEmail,
            setBaseYear: formData.baseYear,
            userId 
        };

        try {
            const response = await createCompany(companyData);
            if (response.data) {
                alert("Company created successfully!");
            } else {
                alert(response.message || "Company creation failed.");
            }
        } catch (error) {
            alert(error.message || "An error occurred.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">
                Create New Client
            </h1>

            <div className="bg-white p-6 rounded shadow-md max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Company Information Section */}
                    <div>
                        <h2 className="text-lg font-bold text-blue-500 mb-4">
                            Company Information
                        </h2>
                        {[
                            { label: "Name", name: "name" },
                            { label: "Reg Number", name: "registrationNumber" },
                            { label: "Address", name: "address" },
                            { label: "Post no.", name: "postNo" },
                            { label: "Postal Name", name: "postalName" },
                            { label: "Contact Email", name: "contactEmail" },
                            { label: "Set Base Year", name: "baseYear" },
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="block text-gray-600 mb-1">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className={`w-full border ${
                                        errors[name] ? "border-red-500" : "border-gray-300"
                                    } rounded px-3 py-2`}
                                />
                                {errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                                )}
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
                                        name="source"
                                        value={label}
                                        onChange={handleChange}
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
                            {formData.source === "Tripletex(pågående aktiv)" ||
                            formData.source === "PowerOffice Go" ? (
                                <div className="mt-4">
                                    <label
                                        htmlFor="apiKey"
                                        className="block text-gray-700 mb-2 text-sm"
                                    >
                                        API Key:
                                    </label>
                                    <input
                                        id="apiKey"
                                        type="text"
                                        name="apiKey"
                                        value={formData.apiKey}
                                        onChange={handleChange}
                                        className={`w-full border ${
                                            errors.apiKey ? "border-red-500" : "border-gray-300"
                                        } rounded px-3 py-2`}
                                    />
                                    {errors.apiKey && (
                                        <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
                                    )}
                                </div>
                            ) : null}

                            {formData.source === "24SevenOffice(pågående aktiv)" && (
                                <div className="mt-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-gray-700 mb-2 text-sm"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`w-full border ${
                                            errors.username ? "border-red-500" : "border-gray-300"
                                        } rounded px-3 py-2`}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                    )}

                                    <label
                                        htmlFor="password"
                                        className="block text-gray-700 mt-4 mb-2 text-sm"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full border ${
                                            errors.password ? "border-red-500" : "border-gray-300"
                                        } rounded px-3 py-2`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>
                            )}

                            {formData.source === "SAF-T-fil" && (
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    No additional fields required for SAF-T.
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
