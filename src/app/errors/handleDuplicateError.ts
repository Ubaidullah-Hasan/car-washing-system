import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]+)"/);
  const extracted_message = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extracted_message} is already exists!`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate ID",
    errorSources,
  };
};

export default handleDuplicateError;
