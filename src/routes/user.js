const router = require('express').Router();
const controller = require('../controller/user');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/create', controller.create);
router.get('/associations', controller.getMany);
router.get('/associations/:id', controller.getOne);
router.put('/disassociate/:id', controller.disassociate);

module.exports = router;