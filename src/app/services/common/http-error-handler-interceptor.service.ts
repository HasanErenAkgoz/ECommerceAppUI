import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toasterService : CustomToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
        this.toasterService.message("You are not authorized to perform this operation.","Unauthorized Actions",
        {
          messageType : ToastrMessageType.Warning,
          position : ToastrPosition.BottomFullWidth
        })
          break;
        case HttpStatusCode.InternalServerError:
          this.toasterService.message("Unable to Access Server. Please Contact Your Administrator.","InternalServerError",
          {
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          })
          break;

          case HttpStatusCode.BadRequest:
            this.toasterService.message("Invalid Request Made. Please Check Your Data..","BadRequest",
          {
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          })
          break;

          case HttpStatusCode.NotFound:
            this.toasterService.message("NotFound","NotFound",
            {
              messageType : ToastrMessageType.Warning,
              position : ToastrPosition.BottomFullWidth
            })
          break;
          default: 
          this.toasterService.message("It was an unexpected mistake.","Error",
          {
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          })
          break;
      }
      return of(error); 
    }))
  }
}
