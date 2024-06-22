import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // zod validation
        // if everything is allright, then call controller otherwise call global error handler
        await schema.parseAsync({
            body: req.body,
        })
        next();
    })
}

export default validateRequest;