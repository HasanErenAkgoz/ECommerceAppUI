import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { _isAuthenticate } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private jwtHelperService : JwtHelperService,private router : Router,private toastrService : CustomToastrService,
    private spinner : NgxSpinnerService){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    this.spinner.show(SpinnerType.BallAtom)
    const token : string = localStorage.getItem("accessToken");
    let isExpired : boolean;
    try{
      isExpired = this.jwtHelperService.isTokenExpired(token);
    }
    catch{
        isExpired = false;
    }
    if(!_isAuthenticate){
        this.router.navigate(["login"], {queryParams : { returnUrl : state.url}})
        this.toastrService.message("Please login as a user", "Unauthorized Access",{
          messageType : ToastrMessageType.Warning,
          position : ToastrPosition.TopRight
        })
    }
    this.spinner.hide();
    return true;
  }
}
