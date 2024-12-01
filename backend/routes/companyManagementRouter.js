const express = require('express');
const router = express.Router();


const { createCompany, companyRequestToUser, userRequestToCompany, acceptRequestOrDeclineRequest } = require('../controller/companyManagementControler');

router.post('/createCompany', createCompany);
router.post('/companyRequestToUser', companyRequestToUser);
router.post('/userRequestToCompany', userRequestToCompany);
router.post('/acceptRequestOrDeclineRequest', acceptRequestOrDeclineRequest);



module.exports = router;