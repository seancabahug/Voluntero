const express = require('express');
const router = new express.Router();

const routes = {
    users: require('./user.route'),
    events: require('./event.route')
}

router.use('/users', routes.users);
router.use('/events', routes.events)


module.exports = router;