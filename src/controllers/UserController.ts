import {Request, Response} from 'express';
import User from '../db/models/user';

import Helper from "../helper/Helper";
import PasswordHelper from '../helper/PasswordHelper';

const Register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, email, password, confirmPassword} = req.body;

        const hashed    = await PasswordHelper.PasswordHashing(password);

        const user = await User.create({
            name, 
            email, 
            password    : hashed,
            active      : true,
            verified    : true,
            roleId      : 1
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
}

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            where:{
                email: email
            }
        })

        if(!user){
            return res.status(401).send(Helper.ResponseData(401, "Not Found", null, null));
        }

        const matched = await PasswordHelper.PasswordCompare(password, user.password);
        
        if(!matched){
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
        }

        const dataUser = {
            name        : user.name,
            email       : user.email,
            roleId      : user.roleId,
            verified    : user.verified,
            active      : user.active
        }

        const token           = Helper.GenerationToken(dataUser);
        const refreshToken    = Helper.GenerationRefreshToken(dataUser);

        user.accessToken = refreshToken;
        await user.save();
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 100
        });

        const responseUser = {
            name        : user.name,
            email       : user.email,
            roleId      : user.roleId,
            verified    : user.verified,
            active      : user.active,
            token       : token
        }
        return res.status(201).send(Helper.ResponseData(201, "Ok", null, responseUser));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
}

export default {Register, UserLogin}