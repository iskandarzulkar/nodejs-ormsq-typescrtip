import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helper from "../../helper/Helper";
import User from "../../db/models/user";

const RegisterValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password, confirmPassword} = req.body;

        const data = {
            name,
            email,
            password,
            confirmPassword
        };
    
    
    
        const rules: Validator.Rules ={
            "name"              : "required|string|max:50",
            "email"             : "required|email",
            "password"          : "required|min:8",
            "confirmPassword"   : "required|same:password"
        }
    
        const validation = new Validator(data, rules);
    
        if(validation.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validation.errors, null));
        }

        const user = await User.findOne({
            where:{
                email: data.email
            }
        })

        if(user){
            const errorData ={
                errors:{
                    email:[
                        "Email already used"
                    ]
                }
            }
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null));
        }
        next();
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, " ", error, null));
    }   
}

const LoginValidation = async(req:Request, res:Response, next: NextFunction) => { 
    try {
        const {email, password}   = req.body;
        
        const data = {
            email,
            password,
        };
    
    
    
        const rules: Validator.Rules ={
            "email"             : "required|email",
            "password"          : "required",
        }
    
        const validation = new Validator(data, rules);
    
        if(validation.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validation.errors, null));
        }

        next();
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, " ", error, null));
    }
}

export default {RegisterValidation, LoginValidation}
