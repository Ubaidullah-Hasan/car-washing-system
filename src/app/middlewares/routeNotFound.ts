import { Request, Response } from "express";
import httpStatus from "http-status";

const routeNotFound = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api route not found!",
    error: "",
  });
};

export default routeNotFound;
