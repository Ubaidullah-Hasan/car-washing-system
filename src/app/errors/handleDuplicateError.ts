import { TErrorSources, TGenericErrorResponse } from "../interface/error"

const handleDuplicateError = (err: any): TGenericErrorResponse => {

    const match = err.message.match(/"([^"]+)"/);
    const extracted_message = match && match[1]
    console.log(extracted_message)

    const errorSources: TErrorSources = [{
        path: "",
        message: `${extracted_message} is already exists!`,
    }]

    const statusCode = 400
    return {
        statusCode,
        message: "Duplicate ID",
        errorSources
    }
}

export default handleDuplicateError;