import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private router : Router,private toasterService : CustomToastrService,private userAuthService : UserAuthService, private spinner  : NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = this.router.url
   
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            }).then(data => {
              if (!state) {
                if (url == "/products"){
                  this.toasterService.message("You Need to Log In to Add Products to Cart",'Warning',{
                    messageType : ToastrMessageType.Warning,
                    position : ToastrPosition.TopRight,
                  })
                }
                else
                {
                  this.toasterService.message("You are not authorized to perform this operation.", "Unauthorized Actions",
                    {
                      messageType: ToastrMessageType.Warning,
                      position: ToastrPosition.BottomFullWidth
                    })
                }
              }
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
      this.spinner.hide(SpinnerType.BallAtom);
      return of(error); 
    }))
  }
}
