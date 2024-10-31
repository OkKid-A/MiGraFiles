import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LocalVariableNames} from '../shared/local-variable-names';
import {Roles} from '../shared/roles';

@Injectable({
  providedIn: 'root'
})
export class ElectorService {

  constructor(private router:Router,
              private http:HttpClient) { }

  public redirectUser(){
    let role = localStorage.getItem(LocalVariableNames.LOCAL_ROLE);
    switch (role){
      case Roles.EMPLEADO:
        this.router.navigate(['empleado']);
        break;
      case Roles.ADMIN:
        this.router.navigate(['admin']);
        break;
      default:
        this.router.navigate(['login']);
    }
  }

  public setLocalVariables(role : string, username : string){
    localStorage.setItem(LocalVariableNames.LOCAL_USER,username);
    localStorage.setItem(LocalVariableNames.LOCAL_ROLE, role);
  }


}
