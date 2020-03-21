import userRepository from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export class AlreadyTakenError extends Error {
    constructor(message) {
        super(message);
        this.name = "AlreadyTakenError";
        this.error = message;
    }
}

const getJwt = (user) => {
    console.log(process.env.JWT_EXPIRES);
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_EXPIRES)
      }
    );
    return token;
}

class UserService {
    async login(email, password) {
        const user = await userRepository.getByEmail(email);
        if(user == null){throw "Unknown email";}
        if(await user.comparePassword(password)) {
            return {token: getJwt(user)};
        }
        return null;
    }

    async register(user) {
        try {
            const userDb = await userRepository.create(user);
            return { token: getJwt(userDb) };
        } catch (error) {
            if (error.keyValue.email) {throw new AlreadyTakenError("EMAIL_TAKEN")}
            if (error.keyValue.username) {throw new AlreadyTakenError("USERNAME_TAKEN")}
            throw error;
        }
    }

    async update() {

    }

    async delete() {

    }

}

export default new UserService();