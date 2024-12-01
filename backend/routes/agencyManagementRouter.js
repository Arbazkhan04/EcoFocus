const express = require('express');
const router = express.Router();

const { promoteToAgency} = require('../controller/agencyMangementController');


router.post('/promoteToAgency', promoteToAgency);


module.exports = router;