const express = require('express');
const videoControler = require('../controller/auth/videoControler')

const router = express.Router();
router.post('/',videoControler.createVideo)
module.exports = router;