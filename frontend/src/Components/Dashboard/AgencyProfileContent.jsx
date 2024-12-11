import React, { useEffect, useState, useCallback } from "react";
import { getAllRequestForAgencyByCompanyOrUser, acceptRequestOrDeclineRequest, agencyRequestConnectionWithUser } from '../../apiManager/request';
import { useSelector } from "react-redux";
import Loader from "../Common/loader"
import { getAllClientAssociatedWithAgency, makeUserOrAdminOfTheCompanyUndetAgency, getAllUsersWhoAreOnlyAssociatedWithAgency, removeUserFromAgency } from "../../apiManager/agency";
import ManageAccessModal from '../Common/ManageAccessModal';
import { usePermissions } from "../Auths/userPermission";

const AgencyProfileContent = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [isAgencyAdmin, setIsAgencyAdmin] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [inviteUserField, setInviteUserField] = useState({ phoneNo: "", email: "" });
  const [client, setClient] = useState([]);
  const [inviteUserError, setInviteUserError] = useState('');
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [employees, setEmployees] = useState([]);

  const company = useSelector((state) => state.appState.company);
  const agencyId = company?.agencyId;

  const role = company?.agencyAdmin ? 'admin' : 'user';
  const permission = usePermissions('agencyPage', role);

  useEffect(() => {
    (async () => {
      setGeneralError("");
      setLoading(true);
      try {
        const res = await getAllRequestForAgencyByCompanyOrUser(agencyId);
        if (!res.data) {
          setGeneralError(res.message || "No requests found");
          return;
        }
        setRequests(res.data);
      } catch (error) {
        setGeneralError(error.message);
      } finally {
        setLoading(false);
      }
    })()
  }, [agencyId]);

  useEffect(() => {
    (async () => {
      setGeneralError("");
      setLoading(true);
      try {
        const res = await getAllClientAssociatedWithAgency(agencyId);
        if (!res.data) {
          setGeneralError(res.message || "No requests found");
          return;
        }
        setClient(res.data);
      } catch (error) {
        setGeneralError(error.message);
      } finally {
        setLoading(false);
      }
    })()
  }, [agencyId]);


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllUsersWhoAreOnlyAssociatedWithAgency(agencyId);
        if (!res.data) {
          setGeneralError(res.message || 'No data found');
        } else {
          setEmployees(res.data);
          console.log(res.data)
        }
      } catch (error) {
        setGeneralError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [agencyId]);


  const validateInviteUser = () => {
    let error = {};
    if (!phoneNo) {
      error.phoneNo = "Phone number is required";
    }
    if (!email) {
      error.email = "Email is required";
    }
    setInviteUserField(error);
    return Object.keys(error).length === 0;
  }

  const handleInviteUser = async (e) => {
    e.preventDefault();
    if (!validateInviteUser()) {
      return;
    }
    setGeneralError("");
    setLoading(true);
    try {
      const res = await agencyRequestConnectionWithUser(phoneNo, email, agencyId, isAgencyAdmin);
      if (!res.data) {
        setGeneralError(res.message || "Request not sent");
        return;
      }
      alert("Request sent successfully");
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const hadleRequest = async (requestId, status) => {
    setGeneralError("");
    setLoading(true);
    try {
      const res = await acceptRequestOrDeclineRequest(requestId, status);
      if (!res.data) {
        setGeneralError(res.message || "Request not accepted");
        return;
      }
      alert("Request accepted successfully");
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseModal = useCallback(() => {
    setShowManageModal(false);
    setSelectedClientId(null);
  }, []);

  const handleRemoveUserFromAgency = async (userId) => {
    setLoading(true);
    try {
      const res = await removeUserFromAgency(userId, agencyId);
      if (!res.data) {
        setGeneralError(res.message || "User not removed");
        return;
      }
      const updatedEmployees = employees.filter(emp => emp.id !== userId);
      setEmployees(updatedEmployees);
      alert("User removed successfully");
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />
  }

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
                {permission.canManageAgencyClients && <th className="border border-gray-300 px-4 py-2">Manage</th>}
              </tr>
            </thead>
            <tbody>
              {client.map((clientItem, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{clientItem.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{clientItem.registrationNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{clientItem.contactPerson}</td>
                  {permission.canManageAgencyClients && (
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        onClick={() => {
                          setSelectedClientId(clientItem.companyId);
                          setShowManageModal(true);
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invite Existing User to Agency */}
        <div className="bg-white p-6 rounded col-span-2 2xl:col-span-1 shadow-md">
          <h2 className="text-lg font-bold text-blue-500 mb-4">Invite Existing User to Agency</h2>
          <form className="space-y-4" onSubmit={handleInviteUser}>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                  setInviteUserField((prev) => ({ ...prev, phoneNo: "" }));
                }}
                className={`w-full border border-gray-300 rounded px-3 py-2 ${inviteUserField.phoneNo && "border-red-500"}`}
              />
              {inviteUserField.phoneNo && <p className="text-red-500 text-sm">{inviteUserField.phoneNo}</p>}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInviteUserField((prev) => ({ ...prev, email: "" }));
                }}
                className={`w-full border border-gray-300 rounded px-3 py-2 ${inviteUserField.email && "border-red-500"}`}
              />
              {inviteUserField.email && <p className="text-red-500 text-sm">{inviteUserField.email}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={isAgencyAdmin}
                onChange={() => setIsAgencyAdmin(!isAgencyAdmin)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="text-gray-600">Agency Admin</label>
            </div>
            { permission.canInviteUsers && (
            <div className="text-center">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Invite User</button>
            </div>
            ) }

            {generalError && <p className="text-red-500 text-sm text-center">{generalError}</p>}
          </form>
        </div>

        {/* Agency Requests */}
        <div className="bg-white p-6 col-span-2 rounded shadow-md">
          <h2 className="text-lg font-bold text-blue-500 mb-4">Agency Requests</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                 { permission.canManageAgencyClients && (
                <>
                <th className="border border-gray-300 px-4 py-2">Accept</th>
                <th className="border border-gray-300 px-4 py-2">Decline</th>
                </>
                 )}
              </tr>
            </thead>
            <tbody >
              {requests.map((request, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{request.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                   { permission.canManageAgencyClients && (
                    <>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                    <button onClick={() => hadleRequest(request.requestId, "accepted")} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Accept</button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button onClick={() => hadleRequest(request.requestId, "declined")} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Deny</button>
                  </td>
                    </>
                   )}
                </tr>
              ))}
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
                { permission.canRemoveUsers && ( 
                <th className="border border-gray-300 px-4 py-2">Remove</th>
                )}
                
               </tr>
            </thead>
            <tbody>

              {employees.map((emp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{emp.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input checked={emp.role == 'admin' ? true : false} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" readOnly />
                  </td>
                  { permission.canRemoveUsers && (
                    <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveUserFromAgency(emp.id)}
                    >
                      Remove access
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the modal conditionally */}
      {showManageModal &&
        <ManageAccessModal
          onClose={handleCloseModal}
          clientId={selectedClientId}
        />
      }
    </div>
  );
};

export default AgencyProfileContent;
