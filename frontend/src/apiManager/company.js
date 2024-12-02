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