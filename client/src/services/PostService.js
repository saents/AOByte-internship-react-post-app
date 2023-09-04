import api from "../api";
import { PostUrlController } from "../constants/apiRoutes";

export default class PostService {
    static async getAll(page, limit, sort= null, filter= 'general') {
        return api.get(PostUrlController.getAll + `/?page=${page}&limit=${limit}&sort=${sort}&filter=${filter}`);
    }

    static async search(searchQuery, selectedKey) {
        return api.get(`${PostUrlController.search}/?q=${searchQuery}&key=${selectedKey}`);
    }

    static async create(postData) {
        return api.post(PostUrlController.create, postData);
    }

    static async update(postData) {
        return api.put(`${PostUrlController.update}/?id=${postData._id}`, postData)
    }

    static async updateUserOwnPost(postData) {
        return api.put(`${PostUrlController.updateUserOwnPost}/?id=${postData._id}`, postData)
    }

    static async delete(postId) {
        return api.delete(`${PostUrlController.delete}/?id=${postId}`);
    }
}
