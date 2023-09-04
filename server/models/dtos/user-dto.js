class UserDto {
    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
