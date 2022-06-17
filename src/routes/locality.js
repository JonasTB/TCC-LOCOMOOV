const router = require('express').Router();
const controller = require('../controller/locality');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/create', controller.create);
router.get('/', controller.getMany);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.delete);

module.exports = router;