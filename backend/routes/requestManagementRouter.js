const express = require('express');
const router = express.Router();

const { getAllRequestForUserByCompany, getAllRequestForCompanyByUser } = require('../controller/requestManagementController');

router.get('/getAllRequestForUserByCompany', getAllRequestForUserByCompany);
router.get('/getAllRequestForCompanyByUser', getAllRequestForCompanyByUser);


module.exports = router;
