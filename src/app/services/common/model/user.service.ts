import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import {firstValueFrom,Observable} from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "User"
    }, user);

    return await firstValueFrom(observable) as CreateUser
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "user",
      action: "login"
    }, { userNameOrEmail, password })

    await firstValueFrom(observable);
    callBackFunction();
  }

}
