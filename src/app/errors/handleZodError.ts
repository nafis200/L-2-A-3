
import { ZodError, type ZodIssue } from "zod";
import { TErrorSource, type TgenereicErrorResponse } from "../interface/error";

 

   const handleZodError = (err: ZodError):TgenereicErrorResponse => {
    const statusCode = 400;

    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    
    

    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  export default handleZodError