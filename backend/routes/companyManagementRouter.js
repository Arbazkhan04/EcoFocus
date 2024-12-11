const express = require('express');
const router = express.Router();


const { createCompany, getCompanies, getCompanyData, getCompanyUsers,
    getAllClientAssociateWithYou, removeClient
 } = require('../controller/companyManagementControler');

router.post('/createCompany', createCompany);
router.get('/getCompanies', getCompanies);
router.get('/getCompanyData', getCompanyData);
router.get('/getCompanyUsers', getCompanyUsers);
router.get('/getAllClientAssociateWithYou', getAllClientAssociateWithYou);
router.post('/removeClient', removeClient);


module.exports = router;