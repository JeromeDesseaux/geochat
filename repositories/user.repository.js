import { User } from "../models/user";

class UserRepository {

    async getById(userId) {
        return await User.findById(userId);
    }

    async getByUsername(username) {
        return await User.findOne({username: username});
    }

    async getByEmail(email) {
        return await User.findOne({email: email});
    }

    async create(data) {
        try {
            return await User.create(data);
        } catch (error) {
            throw error;            
        }
    }

}

export default new UserRepository();