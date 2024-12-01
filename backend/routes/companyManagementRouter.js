const express = require('express');
const router = express.Router();


const { createCompany } = require('../controller/companyManagementControler');

router.post('/createCompany', createCompany);


module.exports = router;