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

export const getUserName = async (phone, email) => {
    const res = await api.get(`/userManagementRoutes/getUserName?phone=${phone}&email=${email}`);
    return res.data;
}

export const getCompanyUsers = async (companyId) => {
    const res = await api.get(`/companyManagementRoutes/getCompanyUsers?companyId=${companyId}`)
    return res.data;
}

export const getAllClientAssociateWithYou = async (userId) => {
    const res = await api.get(`/companyManagementRoutes/getAllClientAssociateWithYou?userId=${userId}`);
    return res.data;
}

export const removeClient = async (companyId,userId) => {
    const res = await api.post('/companyManagementRoutes/removeclient', {userId,companyId});
    return res.data;
}