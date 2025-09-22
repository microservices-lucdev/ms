import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExeptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rcpError = exception.getError();
        
        if(
            typeof rcpError === 'object' 
            && 'status' in rcpError 
            && 'message' in rcpError
            && typeof rcpError.status === 'number'
        ) {
            const status = rcpError.status;
            return response.status(status).json(rcpError);
        }

        response.status(400).json({
            status: 400,
            message: rcpError
        });
    }
}
 
