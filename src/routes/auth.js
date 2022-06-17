const router = require('express').Router();
const controller = require('../controller/auth');

router.post('/login', controller.login);
router.post('/create', controller.create);
router.post('/forgot_password', controller.forgotPassword);
router.put('/reset_password', controller.resetPassword);

module.exports = router;