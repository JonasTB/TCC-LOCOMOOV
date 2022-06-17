const router = require('express').Router();
const controller = require('../controller/admin');
const authMiddleware = require('../middlewares/auth');
const verify = require('../middlewares/verify');

router.use(authMiddleware);
// function helps
router.put('/change_password', controller.changePassword);

// cruds
router.post('/create', controller.create);
router.get('/super_admin', verify([0]), controller.getManySuperAdmins);
router.get('/admin', controller.getManyAdmin);
router.get('/users', controller.getManyUsers);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.delete);

module.exports = router;