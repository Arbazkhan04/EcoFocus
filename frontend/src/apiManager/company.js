import api from './api';

//create a clinet 
export const createCompany = async (company) => {
    const res = await api.post('/companyManagementRoutes/createCompany', company);
    return res.data;
}

export const getCompanies = async (userId) => {
    const res = await api.get(`/companyManagementRoutes/getCompanies?userId=${userId}`);
    return res.data;
}

export const getCompany = async (clientName, baseYear, userId) => {
    const res = await api.get(`/companyManagementRoutes/getCompanyData?userId=${userId}&clientName=${clientName}&baseYear=${baseYear}`);
    return res.data;
}

export const getUserName = async (phoneNo, email) => {
    const res = await api.get(`/userManagementRoutes/getUserName?phoneNo=${phoneNo}&email=${email}`);
    return res.data;
}

export const inviteUserToJoinCompany = async (companyId,userEmail, userPhone, role) => {
    const res = await api.post('/companyManagementRoutes/companyRequestToUser', { companyId, userEmail, userPhone, role });
    return res.data;
}