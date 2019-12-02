const express = require('express');
const router = express.Router();
const footnoteController = require('../../../controllers/footnotes_controller');

router.get('/', footnoteController.index)

module.exports = router
