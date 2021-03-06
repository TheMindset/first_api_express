const express = require('express');
const router = express.Router();
const footnoteController = require('../../../controllers/footnotes_controller');

router.get('/', footnoteController.index)

router.get('/:id', footnoteController.show)

router.post('/', footnoteController.create)

module.exports = router
