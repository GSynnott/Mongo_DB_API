const router = require('express').Router();
const reactions = require('./reactions');
const thoughts = require('./thoughts');
const users = require('./users');

router.use('/reactions', reactions);
router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;