import api from "../api";
import { UserUrlController } from "../constants/apiRoutes";

export default class UserService {
    static getAll() {
        return api.get(UserUrlController.getAll);
    }
    static update(updatedUserData) {
        return api.put(UserUrlController.update, updatedUserData);
    }
}
