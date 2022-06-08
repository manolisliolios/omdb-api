import { Router } from 'express';
import UserController from "../controllers/user.controller"

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/google-login', UserController.googleLogin);

module.exports = router;