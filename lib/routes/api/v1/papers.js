const express = require('express');
const router = express.Router();
const paperController = require('../../../controllers/papers_controller');

router.get('/', paperController.index)
router.get('/api/v1/papers/:id', paperController.show)

module.exports = router