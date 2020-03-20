import express from 'express';
import UserController from "../controllers/user.controller"
import schemas from "../validators/schemas";
import validate from "../middlewares/validate";
import auth from "../middlewares/auth";

var router = express.Router();

router.get('/', UserController.index)
router.post('/register', validate(schemas.User), UserController.register)
router.post('/login', validate(schemas.UserLogin), UserController.login)
router.post('/update', auth, UserController.update)

export default router;