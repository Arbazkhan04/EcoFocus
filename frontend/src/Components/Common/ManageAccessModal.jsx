import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../apiManager/agency';
import { useSelector } from 'react-redux';
import Loader from './loader';
import { makeUserOrAdminOfTheCompanyUndetAgency, removeAccessOfUsers } from '../../apiManager/agency';

const ManageAccessModal = React.memo(({ onClose, clientId }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { company } = useSelector(state => state.appState);
    const agencyId = company?.agencyId;

    const handleMakeAdminOrUser = async (userId, role) => {
        setLoading(true);
        setError(null);
        try {
            const res = await makeUserOrAdminOfTheCompanyUndetAgency(userId, clientId, agencyId, role);
            if (!res.data) {
                setError(res.message || 'Something went wrong');
                return;
            }
            // Update the employees list
            const updatedEmployees = employees.map(emp => {
                if (emp.id === userId) {
                    emp.role = role;
                }
                return emp;
            });
            setEmployees(updatedEmployees);

        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveAccess = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await removeAccessOfUsers(userId, clientId, agencyId);
            if (!res.data) {
                setError(res.message || 'Something went wrong');
                return;
            }
            // Update the employees list
            const updatedEmployees = employees.filter(emp => emp.id !== userId);
            setEmployees(updatedEmployees);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await getAllUsers(agencyId, clientId);
                if (!res.data) {
                    setError(res.message || 'No data found');
                } else {
                    setEmployees(res.data);
                    console.log(res.data)
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [agencyId, clientId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-5xl relative h-3/4 overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-lg font-bold text-blue-500 mb-4">Manage Access for Client {clientId}</h2>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center text-red-500 font-bold mb-4">{error}</div>
                )}

                {!loading && !error && employees.length > 0 && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Admin</th>
                                <th className="border border-gray-300 px-4 py-2">User</th>
                                <th className="border border-gray-300 px-4 py-2">Remove Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td className="border border-gray-300 px-4 py-2">{emp.userName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{emp.role}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleMakeAdminOrUser(emp.id, 'admin')}
                                        >
                                            Make Admin
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleMakeAdminOrUser(emp.id, 'user')}
                                        >
                                            Make User
                                        </button>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveAccess(emp.id)}
                                        >
                                            Remove access
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && employees.length === 0 && (
                    <div className="text-center text-gray-500 font-semibold mt-4">No employees found.</div>
                )}
            </div>
        </div>
    );
});

export default ManageAccessModal;
