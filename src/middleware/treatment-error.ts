import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { QueryFailedError } from "typeorm";

export function TreatmentError(
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction) {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    // ? Implementar LOG da aplicação
    console.log(`Error ${statusCode} in url ${req.url}, method ${req.method}`);
    console.log(`Error detail: ${ error }`);
    return res.status(statusCode).json({ message })
}