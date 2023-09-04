const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const updatedPost = req.body;
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) {
                next(ApiError.SomethingWantsWrong())
            } else {
                return decoded
            }
        });
        if(decodedAccessToken.id !== updatedPost.author.id) {
            next(ApiError.DoesntHaveAccess());
        }
        next();
    } catch (e) {
        return next(ApiError.DoesntHaveAccess());

    }
};
