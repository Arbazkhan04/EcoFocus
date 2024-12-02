const express = require('express');
const router = express.Router();


const { createCompany, getCompanies, getCompanyData } = require('../controller/companyManagementControler');

router.post('/createCompany', createCompany);
router.get('/getCompanies', getCompanies);
router.get('/getCompanyData', getCompanyData);


module.exports = router;