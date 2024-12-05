const express = require('express');
const router = express.Router();


const { createCompany, getCompanies, getCompanyData, getCompanyUsers } = require('../controller/companyManagementControler');

router.post('/createCompany', createCompany);
router.get('/getCompanies', getCompanies);
router.get('/getCompanyData', getCompanyData);
router.get('/getCompanyUsers', getCompanyUsers);


module.exports = router;