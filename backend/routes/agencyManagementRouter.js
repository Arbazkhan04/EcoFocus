const express = require('express');
const router = express.Router();

const { promoteToAgency, getAgencyName, getAllClientAssociatedWithAgency,
     getAllUser, makeUserOrAdminOfTheCompanyUndetAgency,
     removeAccessOfUsers,getAllUsersWhoAreOnlyAssociatedWithAgency,
     removeUserFromAgency
 } = require('../controller/agencyMangementController');


router.post('/promoteToAgency', promoteToAgency);
router.post('/getAgencyName', getAgencyName);
router.get('/getAllClientAssociatedWithAgency', getAllClientAssociatedWithAgency);
router.get('/getAllUser', getAllUser);
router.post('/makeUserOrAdminOfTheCompanyUndetAgency', makeUserOrAdminOfTheCompanyUndetAgency);
router.post('/removeAccessOfUsers', removeAccessOfUsers);
router.get('/getAllUsersWhoAreOnlyAssociatedWithAgency', getAllUsersWhoAreOnlyAssociatedWithAgency);
router.post('/removeUserFromAgency', removeUserFromAgency);

module.exports = router;