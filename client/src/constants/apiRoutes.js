export class ApiRoutes {
    static rootUrl = "http://localhost:5000";

    static baseUrl = `${this.rootUrl}/api`;
}

export class IdentityUrlController extends ApiRoutes {
    static baseIdentity = "/identity";

    static registration = `${this.baseIdentity}/registration`;

    static login = `${this.baseIdentity}/login`;

    static logout = `${this.baseIdentity}/logout`;

    static refresh = `${this.baseIdentity}/refresh`;
}

export class PostUrlController extends ApiRoutes {
    static basePost = `${super.baseUrl}/post`;

    static getAll = `${this.basePost}`;

    static getOne = `${this.basePost}`; // + id

    static create = `${this.basePost}`;

    static delete = `${this.basePost}`; // + id

    static update = `${this.basePost}`; // + id

    static updateUserOwnPost = `${this.basePost}/update-user-own-post`; // + id

    static search = `${this.basePost}/search`;
}

export class UserUrlController extends ApiRoutes {
    static baseUser = `${super.baseUrl}/users`;
    static getAll = `${this.baseUser}`;
    static update = `${this.baseUser}`;
}
