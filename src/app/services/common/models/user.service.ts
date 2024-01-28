import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { catchError, firstValueFrom, Observable, throwError, window } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private customToastrService: CustomToastrService,private router : Router) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "User"
    }, user);
    this.router.navigateByUrl("login")
    return await firstValueFrom(observable) as CreateUser
  }


}
