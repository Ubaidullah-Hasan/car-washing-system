import { ErrorRequestHandler} from "express";
import config from "../config";
import { TErrorSources } from "../interface/error";

// global error handlers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  //setting default values
  const statusCode = 500;
  const message = 'Something went wrong!';

  const errorSources: TErrorSources = [{
    path: "",
    message: "Something went wrong!",
  }]
  console.log("hit global error handler!")

  
  res.status(statusCode).json({
    success: false,
    message,
    errorSource: errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
    err,
  });
};

export default globalErrorHandler;
