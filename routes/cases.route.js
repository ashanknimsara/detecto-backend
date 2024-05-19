const express = require('express');
const casesController = require('../controller/auth/casesController');


const router = express.Router();
router.get('/cases',casesController.getAllCases);
router.post('/addcases',casesController.addCase);
router.get('/moreinformation/:id',casesController.getCaseInformation);
module.exports = router;