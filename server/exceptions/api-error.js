module.exports = class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static DoesntHaveAccess() {
        return new ApiError((400, 'You do not have access to this action.'))
    }

    static SomethingWantsWrong() {
        return new ApiError((404, 'Something wants wrong.'))
    }

    static WrongPassword() {
        return new ApiError(400, 'Wrong old password');
    }

    static UserNotFound() {
        return new ApiError(404, 'Email is not registered.');
    }

    static NotFound() {
        return new ApiError(404, 'Not found');
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authenticated');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static ServerSideError(message) {
        return new ApiError(500, message);
    }
};
