import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from "./user.model";

const createUser : RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {username, email, user_password} : {username: string, email: string, user_password: string} = req.body;
        const user_created = await User.createUser(username, email, user_password);
        res.status(201).json({id: user_created});
    }catch(err){
        console.error("error: ${err}");
        res.status(500).json({error: err});
        next(err);
        
    }
};


const AppController = {createUser};
export default AppController;