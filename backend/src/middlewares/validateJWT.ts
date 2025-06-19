import {NextFunction,Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel';
import { ExtendRequest } from '../types/extendrequest';



const validateJWT = (req: ExtendRequest,res:Response,next:NextFunction) => {
    const authorizationHeader = req.get("authorization");
    if(!authorizationHeader){
        res.status(403).send("Authorization was not provided");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Bearer token is not found");
    }
    jwt.verify(token , process.env.JWT_SECRET || "" , async (err,payload) => {
        if(err){
            res.status(403).send("Invalid token");
            return;
        }
        if(!payload){
            res.status(403).send("Invalid payload token");
            return;
        }
        const userPayload = payload as {firstName : string; lastName : string; email : string};;
        const user = await userModel.findOne({email : userPayload.email});
        req.user = user;
        next();
    });
};
export default validateJWT;