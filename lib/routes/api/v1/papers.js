const express = require('express');
const router = express.Router();
const paperController = require('../../../controllers/papers_controller');

router.get('/', paperController.index)
router.get('/:id', paperController.show)

router.get('/:id/footnotes', paperController.showFootnotes)

module.exports = router