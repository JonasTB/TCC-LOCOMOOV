const router = require('express').Router();
const controller = require('../controller/scooter');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/create', controller.create);
router.get('/find', controller.getMany);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.delete);

module.exports = router;