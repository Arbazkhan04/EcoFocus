import api from './api';


export const inviteUserToJoinCompany = async (companyId,userEmail, userPhone, role) => {
    const res = await api.post('/requestManagementRoutes/companyRequestToUser', { companyId, userEmail, userPhone, role });
    return res.data;
}


export const getAllRequestForCompanyByUser = async (companyId) => {
    const res = await api.get(`/requestManagementRoutes/getAllRequestForCompanyByUser?companyId=${companyId}`);
    return res.data;
}

export const getAllRequestForUserByCompanyOrAgency = async (userId) => {
    const res = await api.get(`/requestManagementRoutes/getAllRequestForUserByCompanyOrAgency?userId=${userId}`);
    return res.data;
}

export const acceptRequestOrDeclineRequest = async (requestId, status) => {
    const res = await api.post('/requestManagementRoutes/acceptRequestOrDeclineRequest', { requestId, status });
    return res.data;
}

export const userRequestToCompany = async (userId, registrationNumber, name) => {
    const res = await api.post('/requestManagementRoutes/userRequestToCompany', { userId, registrationNumber, name });
    return res.data;
}