const ApiError = require('../exceptions/api-error');
const UserService = require('../service/user-service');

class UserController {

    async getAll(req, res, next) {
        try {
            const usersEmailList = await UserService.getAll();
            res.json(usersEmailList);
        } catch (e) {

        }
    }
    async update(req, res, next) {
        try {
            const updatedUserData = req.body;
            const response = await UserService.update(updatedUserData);
            if (!response) {
                next(ApiError.WrongPassword(e.message));
            }
            ;

            res.status(200).send();
        } catch (e) {
            next(ApiError.WrongPassword(e.message));
        }
    }
}

module.exports = new UserController();