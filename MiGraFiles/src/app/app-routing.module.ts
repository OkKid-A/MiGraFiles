import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginViewComponent} from './views/session/login-view/login-view.component';
import {EmployeeViewComponent} from './views/employee/employee-view/employee-view.component';
import {employeeGuard} from "./guards/employee.guard";
import {
  EmployeeLocalViewComponent
} from './views/employee/employee-view/employee-local-view/employee-local-view.component';
import {EmployeeSharedViewComponent} from './views/employee/employee-shared-view/employee-shared-view.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'login',
    title: "Login",
    component: LoginViewComponent
  },
  {
    path:'empleado',
    title: "Empleado",
    component: EmployeeViewComponent,
    canMatch: [employeeGuard],
    children: [
      {path: '', pathMatch: "full", redirectTo:'/empleado/local'},
      {path: 'local',title:"Raiz",component:EmployeeLocalViewComponent},
      {path: 'local/:url', component:EmployeeLocalViewComponent, title:"Local"},
      {path: 'shared', component:EmployeeSharedViewComponent, title:"Shared"}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
    exports:[RouterModule]
})
export class AppRoutingModule { }
