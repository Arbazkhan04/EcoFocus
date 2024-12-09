const express = require('express');
const router = express.Router();

const { promoteToAgency, getAgencyName } = require('../controller/agencyMangementController');


router.post('/promoteToAgency', promoteToAgency);
router.post('/getAgencyName', getAgencyName);

module.exports = router;