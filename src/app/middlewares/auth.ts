import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/user/user.model";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // if the token is sent from the client
        if (!token) {
            throw new AppError(httpStatus?.UNAUTHORIZED, "You are not authorized to access this!")
        }


        // check if the token is valid
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        // decoded 
        const { email, role } = decoded; 

        // check if user is exists
        if (!(await UserModel.isUserExistByCustomEmail(email))) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus?.UNAUTHORIZED, "You are not authorized to access this!")
        }

        req.user = decoded as JwtPayload;
        next();


    })
}

export default auth;