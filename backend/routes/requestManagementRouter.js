const express = require('express');
const router = express.Router();

const { getAllRequestForUserByCompany,
    getAllRequestForCompanyByUser,
    getAllRequestForAgencyByCompany,
    userRequestToAgency,
    companyRequestToUser,
    userRequestToCompany,
    companyRequestConnectionWithAgency,
    agencyRequestConnectionWithUser,
    acceptRequestOrDeclineRequest } = require('../controller/requestManagementController');

router.get('/getAllRequestForUserByCompany', getAllRequestForUserByCompany);
router.get('/getAllRequestForCompanyByUser', getAllRequestForCompanyByUser);
router.get('/getAllRequestForAgencyByCompany', getAllRequestForAgencyByCompany);
router.post('/userRequestToAgency', userRequestToAgency);
router.post('/companyRequestToUser', companyRequestToUser);
router.post('/userRequestToCompany', userRequestToCompany);
router.post('/companyRequestConnectionWithAgency', companyRequestConnectionWithAgency);
router.post('/agencyRequestConnectionWithUser', agencyRequestConnectionWithUser);
router.post('/acceptRequestOrDeclineRequest', acceptRequestOrDeclineRequest);

module.exports = router;
