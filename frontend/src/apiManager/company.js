import api from './api';

//create a clinet 
export const createCompany = async (company) => {
    const res = await api.post('/companyManagementRoutes/createCompany', company);
    return res.data;
}