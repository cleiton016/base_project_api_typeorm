import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { constants } from "../utils/constants";
import { TokenData } from "../utils/types/token-data.type";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!constants.prod){
        req.body.accountLogged = "dev"
        return next()
    }

    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(401).json({
            msg: "Token não informado"
        })
    }
    
    const token = authToken.replace('Bearer ', '')
    
    try {
        jwt.verify(token, constants.jwt.private_key!)
        const data = jwt.decode(token) as TokenData
        req.body.accountLogged = data.accountId
        return next()
    } catch (error) {
        return res.status(401).json({
            msg: "Token invalido"
        })
    }

}