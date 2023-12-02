import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    let isExpired: boolean;
    try {
      isExpired = this.jwtHelperService.isTokenExpired(token);
    }
    catch {
      isExpired = false;
    }

    _isAuthenticate = token != null && !isExpired;
  }

  get isAuthenticated() : boolean{
    return _isAuthenticate;
  }
}

export let _isAuthenticate : boolean;

