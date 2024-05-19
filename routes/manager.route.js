const express = require('express');
const manageController = require('./../controller/auth/managerController')

const router = express.Router();
router.post('/update/:id',manageController.updateUser)
router.post('/delete/:id',manageController.deleteUser)
router.get('/',manageController.getAllUsers)
router.post('/access/:id',manageController.access)
module.exports = router;