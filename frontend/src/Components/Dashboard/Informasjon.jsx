
import React, { useEffect, useState } from "react";
import { getUserName, getCompanyUsers } from "../../apiManager/company";
import { inviteUserToJoinCompany, getAllRequestForCompanyByUser,companyRequestConnectionWithAgency } from "../../apiManager/request";
import Loader from "../Common/loader";
import { useSelector } from "react-redux";
import { promoteToAgency } from "../../apiManager/agency";
import { useDispatch } from "react-redux";
import { setCompanyInStore } from "../../slices/appStateSlice"


const Informasjon = () => {
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [isCompanyAdmin, setIsCompanyAdmin] = useState(false); // Tracks checkbox state
    const [fieldErrorsForInviteUser, setFieldErrorsForInviteUser] = useState({ phoneNo: "", email: "" }); // Inline field errors
    const [generalError, setGeneralError] = useState(""); // General error for API failures
    const [companyUsers, setCompanyUsers] = useState([]);

    const [registrationNumber, setRegistrationNumber] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [fieldErrorForAgencyFields, setFieldErrorForAgencyFields] = useState({ registrationNumber: "", agencyName: "" }); // Inline field errors
    const [agencyGeneralError, setAgencyGeneralError] = useState(""); // General error for API failures
    const company = useSelector((state) => state.appState.company);
    const companyId = company._id;

    const dispatch = useDispatch();

    //get all request for company by user
    useEffect(() => {
        setGeneralError("");
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const res = await getAllRequestForCompanyByUser(companyId);
                if (!res.data) {
                    setGeneralError(res.message || "No requests found.");
                    return;
                }
                setRequests(res.data);
            } catch (error) {
                setGeneralError(error.message || "An error occurred while fetching requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [companyId]);

    const validateInviteUser = () => {
        let errors = {};
        if (!phoneNo) errors.phoneNo = "Phone number is required.";
        if (!email) errors.email = "Email is required.";

        setFieldErrorsForInviteUser(errors);
        return Object.keys(errors).length === 0;
    };

    

    const validateAgencyRequest = () => {
        let errors = {};
        if (!registrationNumber) errors.registrationNumber = "registration number is required.";
        if (!agencyName) errors.agencyName = "agency name is required.";

        setFieldErrorForAgencyFields(errors);
        return Object.keys(errors).length === 0;
    };

    const handleGetUserName = async () => {
        setGeneralError("");
        if (!validateInviteUser()) return;

        setLoading(true);
        try {
            const res = await getUserName(phoneNo,email);
            if (!res.data) {
                setGeneralError(res.message || "No user found.");
            } else {
                setUserName(res.name); // Assuming `res.data` contains the `name` of the user
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while fetching user info.");
        } finally {
            setLoading(false);
        }
    };


    const handleInviteUser = async (e) => {
        e.preventDefault();
        setGeneralError("");
        console.log("Inviting user");
        if (!validateInviteUser()) return;

        setLoading(true);
        try {
            const res = await inviteUserToJoinCompany(
                companyId,
                email,
                phoneNo,
                isCompanyAdmin ? "company_admin" : "user"
            );
            if (!res.data) {
                setGeneralError(res.message || "Could not invite user.");
            } else {
                setGeneralError("");
                alert("User invited successfully.");
                setPhoneNo("");
                setEmail("");
                setUserName("");
                setIsCompanyAdmin(false);
            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while inviting the user.");
        } finally {
            setLoading(false);
        }
    };


    const handleInviteAgency = async (e) => {
        e.preventDefault();
        console.log("Inviting agency");
        setGeneralError("");
        if (!validateAgencyRequest()) return;

        setLoading(true);
        try {
            const res = await companyRequestConnectionWithAgency(
                companyId,
                registrationNumber,
                agencyName
            );
            console.log(res)
            if (!res.data) {
                setAgencyGeneralError(res.message || "Could not invite user.");
            } else {
                setAgencyGeneralError("");
                alert("Agency invited successfully.");
                setRegistrationNumber("");
                setAgencyName("");

            }
        } catch (error) {
            setGeneralError(error.message || "An error occurred while inviting the user.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            setGeneralError("");
            setLoading(true);
            try {
                const res = await getCompanyUsers(companyId);
                if(!res.data) {
                    setGeneralError(res.message || "No users found.");
                    return;
                }
                setCompanyUsers(res.data);
            }catch (error) {
                setGeneralError(error.message || "An error occurred while fetching users.");
            }finally {
                setLoading(false);
            }
        })()
    },[companyId]);

    const makeAgency = async (id) => {
        setGeneralError("");
        setLoading(true);
        try {
            const res = await promoteToAgency(id);
            if(!res.data) {
                setGeneralError(res.message || "Could not promote to agency.");
                return;
            }

            //update the redux store
            const companyData = {
                ...company,
                agencyId: res.agencyId,
                isAgency: true,
                contactPersonOfAgency:true
            }

            //dispatch the action to update the company
            dispatch(setCompanyInStore(companyData));

            alert("Promoted to agency successfully.");
        } catch (error) {
            setGeneralError(error.message || "An error occurred while promoting to agency.");
        }finally {
            setLoading(false);
        }
    }

    const handleAccept = (requestId) => {
        console.log(`Accepted request with ID: ${requestId}`);
        // Implement your logic here (e.g., API call)
    };

    const handleDeny = (requestId) => {
        console.log(`Denied request with ID: ${requestId}`);
        // Implement your logic here (e.g., API call)
    };

    const handleRemoveAcess = async (userId) => {
        console.log(`Removing access for user with ID: ${userId}`);
        // Implement your logic here (e.g., API call)
    }

    if (loading) return <div><Loader /></div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Company Information */}
                <div className="bg-white p-4 rounded shadow-md col-span-2 lg:col-span-3 xl:col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Company Information</h2>
                    <form className="space-y-2">
                        {["name", "registrationNumber", "address", "postalCode", "postalName", "contactEmail"].map((label) => (
                            <div key={label}>
                                <label className="block text-gray-600 mb-1">{label}</label>
                                <input
                                    value={company ? company[label] : ""}
                                    readOnly
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        ))}
                        <div className="text-center ">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default form submission behavior
                                    makeAgency(companyId); // Trigger your custom function
                                  }}
                                className="w-4/6 mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Promote to Agency
                            </button>
                        </div>
                    </form>
                </div>

                {/* Invite Existing User to Company */}
                <div className="bg-white p-4 col-span-3 lg:col-span-3 xl:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Invite Existing User to Company</h2>
                    <form className="space-y-4" onSubmit={handleInviteUser}>
                        <div>
                            <label className="block text-gray-600 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={phoneNo}
                                onChange={(e) => {
                                    setPhoneNo(e.target.value);
                                    setFieldErrorsForInviteUser((prev) => ({ ...prev, phoneNo: "" })); // Clear error on input change
                                }}
                                className={`w-full border px-3 py-2 rounded ${fieldErrorsForInviteUser.phoneNo ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter phone number"
                            />
                            {fieldErrorsForInviteUser.phoneNo && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrorsForInviteUser.phoneNo}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setFieldErrorsForInviteUser((prev) => ({ ...prev, email: "" })); // Clear error on input change
                                }}
                                className={`w-full border px-3 py-2 rounded ${fieldErrorsForInviteUser.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter email"
                            />
                            {fieldErrorsForInviteUser.email && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrorsForInviteUser.email}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleGetUserName}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        >
                            Get User Name
                        </button>

                        {userName && (
                            <p className="text-gray-500 mt-2">
                                You are inviting <span className="font-bold">{userName}</span>
                            </p>
                        )}

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isCompanyAdmin}
                                onChange={() => setIsCompanyAdmin(!isCompanyAdmin)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <label className="text-gray-600">Agency Admin</label>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        >
                            Invite User
                        </button>

                        {generalError && <p className="text-red-500 mt-2">{generalError}</p>}
                    </form>
                </div>

                {/* Request connection with Agency */}
                  <div className="bg-white p-4 col-span-3 lg:col-span-3 xl:col-span-1 rounded shadow-md">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Request connection with Agency</h2>
                    <form className="space-y-4" onSubmit={handleInviteAgency}>
                        <div>
                            <label className="block text-gray-600 mb-1">Registration Number</label>
                            <input
                                type="text"
                                value={registrationNumber}
                                onChange={(e) => {
                                    setRegistrationNumber(e.target.value);
                                    setFieldErrorForAgencyFields((prev) => ({ ...prev, registrationNumber: "" })); // Clear error on input change
                                }}
                                className={`w-full border px-3 py-2 rounded ${fieldErrorForAgencyFields.registrationNumber ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter registration number"
                            />
                            {fieldErrorForAgencyFields.registrationNumber && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrorForAgencyFields.registrationNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                value={agencyName}
                                onChange={(e) => {
                                    setAgencyName(e.target.value);
                                    setFieldErrorForAgencyFields((prev) => ({ ...prev, agencyName: "" })); // Clear error on input change
                                }}
                                className={`w-full border px-3 py-2 rounded ${fieldErrorForAgencyFields.agencyName ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter email"
                            />
                            {fieldErrorForAgencyFields.agencyName && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrorForAgencyFields.agencyName}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        >
                            Invite Agency
                        </button>

                        {agencyGeneralError && <p className="text-red-500 mt-2">{agencyGeneralError}</p>}
                    </form>
                </div>


                {/* Company Requests */}
                <div className="w-full bg-white p-4 overflow-x-auto col-span-3 lg:col-span-3 xl:col-span-2 rounded shadow-md">
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
                            {requests.map((item) => (
                                <tr key={item.requestId}>
                                    <td className="border border-gray-300 px-4 py-2">{item.userName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleAccept(item.requestId)}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDeny(item.requestId)}
                                        >
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Users With Access */}
                <div className="bg-white overflow-auto p-4 col-span-3 rounded shadow-md col-span-2">
                    <h2 className="text-lg font-bold text-blue-500 mb-4">Users With Access</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {["Name", "Email", "Phone", "CompanyAdmin", "Remove Access"].map((header) => (
                                    <th key={header} className="border border-gray-300 px-4 py-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {companyUsers.map((user) => (
                                <tr key={user.userId}>
                                <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked={user.role == 'admin'} />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleRemoveAcess(user.userId)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                                </td>
                            </tr>
                            ))}
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
        </div>
    );
};

export default Informasjon;
