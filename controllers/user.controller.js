import userService from "../services/user.services";

class UserController {
    index(req, res) {
        return res.status(200).json("Coucou les users");
    }

    async register(req,res) {
        try {
            const user = await userService.register(req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(409).json(error);
        }
    }

    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await userService.login(email, password);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(401).json(error);
        }
    }

    async update(req, res) {
        return res.json(req.user);
    }
}

export default new UserController();