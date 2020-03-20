import userService from "../services/user.services";
import {getLocationFromIP} from "../utils/iplookup";

class UserController {
    index(req, res) {
        // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ll = getLocationFromIP(req.ipInfo.ip)
        return res.status(200).json(ll);
    }

    async register(req,res) {
        try {
            let user;
            if(req.body.location){
                user = await userService.register(req.body);
            }else{
                const ll = getLocationFromIP(req.ipInfo.ip)
                const userData = {
                    ...req.body,
                    location:{
                        type: "Point",
                        coordinates: ll
                    }
                }
                user = await userService.register(userData);
            }
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