import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        console.log(decode);
        next();
    } catch (error) {
        console.log("Error in authMiddleware: ", error);
        res.send("invalid login attempt");
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if(user?.role === 1){
            next();
        }
        else {
            res.status(404).send({
                success: false,
                message: "Unauthorized Access"
            });
        }
        
    } catch (error) {
        console.log("Error in isAdmin auth middleware: ", error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
}