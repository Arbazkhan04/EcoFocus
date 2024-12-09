import api from './api'

export const promoteToAgency = async (companyId) => {
    const res = await api.post('/agencyManagementRoutes/promoteToAgency', { companyId })
    return res.data;
} 

export const getAgencyName = async ( registrationNumber, agencyName) => {
    const res = await api.post('/agencyManagementRoutes/getAgencyName', { registrationNumber, agencyName })
    return res.data;
}