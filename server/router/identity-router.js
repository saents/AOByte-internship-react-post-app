const Router = require('express').Router;

const authMiddleware = require('../middlewares/auth-middleware');
const registrationMiddleware = require('../middlewares/registration-middleware');

const IdentityController = require('../controllers/identity-controller');
const {IdentityUrlController} = require('../constants/api-routes');

const router = new Router();

router.post(IdentityUrlController.registration, registrationMiddleware, IdentityController.registration);
router.get(IdentityUrlController.activate + '/:link', IdentityController.activate);
router.post(IdentityUrlController.login, IdentityController.login);
router.post(IdentityUrlController.logout, authMiddleware, IdentityController.logout);
router.get(IdentityUrlController.refresh, authMiddleware, IdentityController.refresh);
router.get(IdentityUrlController.getAll, authMiddleware, IdentityController.getUsers);

module.exports = router;
