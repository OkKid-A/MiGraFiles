import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../entities/user';
import {LocalVariableNames} from '../../../shared/local-variable-names';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent implements OnInit{
  auth: boolean;
  user: string='';

  constructor(private logS: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
    this.auth = false;
  }

  protected routerBusqueda="local";
  protected routerShared = "shared";


  ngOnInit() {
    this.auth = this.logS.isAuthenticated();
    this.user = localStorage.getItem(LocalVariableNames.LOCAL_USER)??'';
  }

  logout() : void{
    this.logS.logout();
    this.router.navigate(['login']);
  }

  protected readonly faMagnifyingGlassPlus = faMagnifyingGlassPlus;

}
