export function CustomException(message:string, statusCode: number) {
    const error = new Error(message);
    //@ts-ignore
    //@ts-nocheck
    error.code = statusCode;
    return error;
  }
  
  CustomException.prototype = Object.create(Error.prototype);