import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuth} from '../entities/user-auth';
import {UserStored} from '../entities/user-stored';
import {Links} from '../shared/links';
import {LocalVariableNames} from '../shared/local-variable-names';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public findUser(user : UserAuth) : Observable<UserStored> {
    return this.http.post<UserStored>(Links.API_URL+"login", user);
  }

  public isAuthenticated() : boolean{
    return localStorage.getItem(LocalVariableNames.LOCAL_ROLE) != undefined;
  }

  public logout() : void {
    localStorage.removeItem(LocalVariableNames.LOCAL_USER);
    localStorage.removeItem(LocalVariableNames.LOCAL_ROLE);
  }

  public encryptar(password : string) : string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }
}
