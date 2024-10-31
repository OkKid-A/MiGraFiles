import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../entities/user';
import {LoginService} from '../../../services/login.service';
import {ElectorService} from '../../../services/elector.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {UserAuth} from '../../../entities/user-auth';
import {UserStored} from '../../../entities/user-stored';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  loginForm! : FormGroup;
  user! : User;
  existente : boolean;

  constructor(private fb:FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private electorService: ElectorService) {
    this.existente = false;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null,[Validators.required, Validators.maxLength(40)]],
      password: [null, [Validators.required, Validators.maxLength(64)]]
    })
  }

  submit() : void {
    if (this.loginForm.valid){
      let pass = this.loginService.encryptar(this.loginForm.get('password')?.value);
      const user : UserAuth = {username:this.loginForm.get('username')?.value,
      password: pass};
      this.loginService.findUser(user).subscribe({
        next: (creado : UserStored) => {
          this.electorService.setLocalVariables(creado.rol, user.username);
          this.electorService.redirectUser();
          this.loginForm.reset();
        },
        error: (err:any) => {
          alert("El usuario no fue encontrado." + err);
          console.log(err)
        }
      });
    }
  }
}
