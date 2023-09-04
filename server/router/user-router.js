const Router = require('express').Router;

const UserController = require('../controllers/user-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');

const {UserUrlController} = require('../constants/api-routes');

const router = new Router();

// router.get(UserUrlController.getOne, UserController.get);
router.get(UserUrlController.getAll, AuthMiddleware, UserController.getAll)
router.put(UserUrlController.update, AuthMiddleware, UserController.update);


module.exports = router;