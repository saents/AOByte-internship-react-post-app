const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user-repository');
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/schemas/user-schema");

class UserService {

    async getAll() {
        try {
            const userList = await UserRepository.getAll();
            const usersEmailList = userList.map(user => user.email);
            return usersEmailList;
        } catch (e) {
            console.log(e);
        }
    }
    async update(updatedUserData) {
        try {
            const {id, email, oldPassword, newPassword} = updatedUserData;
            const user = await UserModel.findById(id);
            const isPassEquals = await bcrypt.compare(oldPassword, user.password);
            if (!isPassEquals) {
                throw ApiError.BadRequest('Wrong password');
            }
            const hashNewPassword = await bcrypt.hash(newPassword, 3);
            const updatedData = {
                id, email, password: hashNewPassword
            };
            const response = await UserRepository.update(updatedData);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserService();