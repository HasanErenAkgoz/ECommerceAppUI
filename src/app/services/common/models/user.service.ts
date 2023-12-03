import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private customToastrService: CustomToastrService) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "User"
    }, user);

    return await firstValueFrom(observable) as CreateUser
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "user",
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
      this.customToastrService.message("User Login Successful", "Login Successful", {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.TopRight
      })
      callBackFunction();
    }
  }


  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    !user.lastName ? user.lastName = user.name : user.lastName
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "user"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (Token) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.customToastrService.message("You have successfully logged in using your Google Account.", "Successfully", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
  }

}
