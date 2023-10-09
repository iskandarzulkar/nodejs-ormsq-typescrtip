import { Request, Response, NextFunction } from "express";
import Helper from "../helper/Helper";

const Authenticated = (req: Request, res:Response, next:NextFunction) => {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];
        console.log(token);
        if(token === null){  
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null))
        }

        const result = Helper.ExtractToken(token!);
        next();
    } catch (err: any) {
        return res.status(500).send(Helper.ResponseData(500, "", err, null));
    }
}

export default {Authenticated}