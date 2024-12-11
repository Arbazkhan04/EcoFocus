import api from './api'

export const promoteToAgency = async (companyId) => {
    const res = await api.post('/agencyManagementRoutes/promoteToAgency', { companyId })
    return res.data;
} 

export const getAgencyName = async ( registrationNumber, agencyName) => {
    const res = await api.post('/agencyManagementRoutes/getAgencyName', { registrationNumber, agencyName })
    return res.data;
}

export const getAllClientAssociatedWithAgency = async (agencyId) => {
    const res = await api.get(`/agencyManagementRoutes/getAllClientAssociatedWithAgency?agencyId=${agencyId}`)
    return res.data;
}

export const getAllUsers = async (agencyId,companyId) => {
    const res = await api.get(`agencyManagementRoutes/getAllUser?agencyId=${agencyId}&companyId=${companyId}`)
    return res.data;
}

export const makeUserOrAdminOfTheCompanyUndetAgency = async (userId, companyId, agencyId, role) => {
    const res = await api.post('/agencyManagementRoutes/makeUserOrAdminOfTheCompanyUndetAgency', { userId, companyId, agencyId, role })
    return res.data;
}

export const removeAccessOfUsers = async (userId, companyId, agencyId) => {
    const res = await api.post('/agencyManagementRoutes/removeAccessOfUsers', { userId, companyId, agencyId })
    return res.data;
}

export const getAllUsersWhoAreOnlyAssociatedWithAgency = async (agencyId) => {
    const res = await api.get(`/agencyManagementRoutes/getAllUsersWhoAreOnlyAssociatedWithAgency?agencyId=${agencyId}`)
    return res.data;
}

export const removeUserFromAgency = async (userId, agencyId) => {
    const res = await api.post('/agencyManagementRoutes/removeUserFromAgency', { userId, agencyId })
    return res.data;
}