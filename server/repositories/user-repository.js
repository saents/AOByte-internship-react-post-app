const UserModel = require('../models/schemas/user-schema');

class UserRepository {

    async getAll() {
        const users = await UserModel.find();
        return users;
    }
    async update(updatedData) {
        const response = await UserModel.findByIdAndUpdate(updatedData.id, updatedData);
        return response;
    }

    async get(id) {
        const user = await UserModel.findById(id);
        return user;
    }
}

module.exports = new UserRepository();