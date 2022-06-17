const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/admin/scooter', require('./scooter'));
router.use('/locality', require('./locality'));
router.use('/user', require('./user'));

module.exports = router;