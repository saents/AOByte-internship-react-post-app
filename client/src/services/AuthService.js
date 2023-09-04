import api from "../api";
import { IdentityUrlController } from "../constants/apiRoutes";

export default class AuthService {
    static async login(email, password) {
        return api.post(IdentityUrlController.login, {email, password});
    }

    static async registration(email, password) {
        return api.post(IdentityUrlController.registration, {email, password});
    }

    static async logout() {
        return api.post(IdentityUrlController.logout);
    }

    static async getUserByToken() {
        return api.get(IdentityUrlController.refresh);
    }
}
