import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { constants } from "../utils/constants";
import { TokenData } from "../utils/types/token-data.type";
import { BadRequestError } from "../utils/api-error";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!constants.prod){
        req.body.accountLogged = "dev"
        return next()
    }

    const authToken = req.headers.authorization
    if (!authToken) {
        throw new BadRequestError("Token não informado")
    }
    
    const token = authToken.replace('Bearer ', '')
    
    try {
        jwt.verify(token, constants.jwt.private_key!)
        const data = jwt.decode(token) as TokenData
        req.body.accountLogged = data.accountId
        return next()
    } catch (error) {
        throw new BadRequestError("Token invalido")
    }

}