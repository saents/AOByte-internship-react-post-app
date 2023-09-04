const Router = require('express').Router;

const authMiddleware = require('../middlewares/auth-middleware');
const updateUserOwnPostMiddleware = require('../middlewares/update-user-own-post-middlware');
const PostController = require('../controllers/post-controller');

const {PostUrlController} = require('../constants/api-routes');

const router = new Router();

router.get(PostUrlController.search, PostController.search)
router.get(PostUrlController.getAll, PostController.getAll);
router.get(PostUrlController.getOne, authMiddleware, PostController.getOne);
router.post(PostUrlController.create, authMiddleware, PostController.create);
router.put(PostUrlController.update, authMiddleware, PostController.update);
router.put(PostUrlController.updateUserOwnPost, authMiddleware, updateUserOwnPostMiddleware, PostController.update);
router.delete(PostUrlController.delete, authMiddleware, PostController.delete);

module.exports = router;