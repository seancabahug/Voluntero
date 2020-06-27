const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const eventController = require('../controllers/events.controller');

router.post('/create', auth, eventController.create);
router.get('/:eventId', eventController.findEventById);

module.exports = router;