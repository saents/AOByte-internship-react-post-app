const {validationResult} = require('express-validator');

const IdentityService = require('../service/identity-service');
const ApiError = require('../exceptions/api-error');

class IdentityController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error on validation', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await IdentityService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await IdentityService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (e) {
            next(ApiError.UserNotFound(e.message));
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await IdentityService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await IdentityService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await IdentityService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await IdentityService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }
}


module.exports = new IdentityController();
