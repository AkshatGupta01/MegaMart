import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/test', requireSignIn, testController);

//forgot password route
router.post('/forgot-password', forgotPasswordController);

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok : true});
});

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok : true});
});

export default router;