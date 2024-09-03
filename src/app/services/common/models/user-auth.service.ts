import { state } from '@angular/animations';
import { TokenResponse } from './../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private customToastrService: CustomToastrService,private router : Router) { }


  async login(userNameOrEmail: string, password: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password }).pipe(
      catchError(error => {
        this.customToastrService.message("Error occurred during login", "Login Error", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight
        });
        return (error);
      }))
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)

      this.customToastrService.message("User Login Successful", "Login Successful", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
      this.router.navigateByUrl("home")

      callBackFunction(tokenResponse ? true : false);
    }
  }

  async refreshTokenLogin(refreshToken : string,callBackFunction? : (state) => void) : Promise<any>{
    const observable : Observable<any | TokenResponse> = this.httpClientService.post({
      action : "refreshtokenlogin",
      controller : "auth"
    },{refreshToken : refreshToken})

    try
    {
      const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken)
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
      }
      callBackFunction(tokenResponse ? true : false);
    }
    catch {
      callBackFunction(false);
    }
 
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    !user.lastName ? user.lastName = user.name : user.lastName
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (Token) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken")
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)

      this.customToastrService.message("You have successfully logged in using your Google Account.", "Successfully", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }
}
