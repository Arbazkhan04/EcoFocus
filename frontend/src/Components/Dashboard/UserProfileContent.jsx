import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllRequestForUserByCompanyOrAgency, userRequestToCompany } from "../../apiManager/request";
import { acceptRequestOrDeclineRequest } from "../../apiManager/request";

import Loader from '../Common/loader';

const UserProfileContent = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const [userName, setUserName] = useState(userInfo.userName||'');
    const [phone, setPhone] = useState(userInfo.phone||'');
    const [email, setEmail] = useState(userInfo.email||'');
    const [laoding, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [companyRegNumber, setCompanyRegNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requests, setRequests] = useState([]);
    const [fieldErrorForCompany, setFieldErrorForCompany] = useState({ companyRegNumber: '', companyName: '' });
  
    const validateCompanyRequest = () => {
        let error = {};
        if (!companyRegNumber) {
            error.companyRegNumber = 'Company Reg Number is required';
        }
        if (!companyName) {
            error.companyName = 'Company Name is required';
        }
        setFieldErrorForCompany(error);

        return Object.keys(error).length === 0;
    };

    const handleRquestToCompany = async () => {
        if (!validateCompanyRequest()) return;
        setLoading(true);
        (async ()=>{
            try {
                const res = await userRequestToCompany(userInfo.userId,companyRegNumber,companyName);
                if(!res.data) {
                    setGeneralError(res.message || 'Request not sent');
                    return;
                }
                alert('Request sent successfully');
            }catch (error){
                setGeneralError('Something went wrong');
            }finally {
                setLoading(false);
            }
        })()
    }

   const handleRequest = async (requestId,status) => {
        setLoading(true);
        try {
            const res = await acceptRequestOrDeclineRequest(requestId,status);
            if(!res.data) {
                setGeneralError('Request updated successfully');
            }
        }catch (error){
            setGeneralError('Something went wrong');
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        (async () => {
            setLoading(true);
            try {
                const res = await getAllRequestForUserByCompanyOrAgency(userInfo.userId);
                if(!res.data) {
                    setGeneralError('No data found');
                }
                setRequests(res.data);
                console.log(res);
            }catch (error){
                setGeneralError('Something went wrong');
            }finally {
                setLoading(false);
            }
        })();
    },[userInfo.userId]);


    if(laoding) {
        return <Loader />
    }

    if(generalError) {
        return <p className="text-red-500 text-center">{generalError}</p>
    }

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
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
                                value={companyRegNumber}
                                onChange={(e) => setCompanyRegNumber(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                             {fieldErrorForCompany.companyRegNumber && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrorForCompany.companyRegNumber}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                                {fieldErrorForCompany.companyName && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrorForCompany.companyName}</p>
                                )}
                        </div>
                        <button onClick={handleRquestToCompany} type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
                                <th className="border border-gray-300 px-4 py-2">Company/Agency</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Accept</th>
                                <th className="border border-gray-300 px-4 py-2">Deny</th>
                            </tr>
                        </thead>
                        <tbody>
                            { requests.length > 0 && requests.map((request, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.role}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button onClick={() => handleRequest(request.requestId,"accepted")} type="button" className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                                Accept
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button onClick={() => handleRequest(request.requestId,"declined")} type="button" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                                Deny
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
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
