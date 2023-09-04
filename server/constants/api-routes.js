class IdentityUrlController {
    static baseIdentity = '/identity';

    static activate = this.baseIdentity + '/activate'; // "/:id"
    static registration = this.baseIdentity + '/registration';
    static login = this.baseIdentity + '/login';
    static logout = this.baseIdentity + '/logout';
    static refresh = this.baseIdentity + '/refresh';
    static getAll = this.baseIdentity + '/users';
}

class PostUrlController {
    static basePost = '/post';
    static getAll = this.basePost;
    static getOne = this.basePost; // /:id
    static create = this.basePost;
    static delete = this.basePost; // /:id
    static update = this.basePost; // /:id
    static updateUserOwnPost = `${this.basePost}/update-user-own-post`; // :id
    static search = `${this.basePost}/search`; // /:q:key
}

class UserUrlController {
    static baseUser = '/users';
    static getAll = this.baseUser;
    static getOne = this.baseUser; // /:id
    static update = this.baseUser; // /:id
}

module.exports = {IdentityUrlController, PostUrlController, UserUrlController};