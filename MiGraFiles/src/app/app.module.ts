import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from "./app-routing.module";
import {AngularMaterialModule} from "./angular-material.module";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MatGridListModule} from "@angular/material/grid-list";
import {LoginViewComponent} from './views/session/login-view/login-view.component';
import {LoginFormComponent} from './components/session/login-form/login-form.component';
import {MatTableModule} from '@angular/material/table';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {EmployeeViewComponent} from './views/employee/employee-view/employee-view.component';
import {EmployeeHeaderComponent} from './components/headers/employee-header/employee-header.component';
import {DirListComponent} from './components/docs/dir-list/dir-list.component';
import {FileSpanComponent} from './components/docs/file-span/file-span.component';
import {
  EmployeeLocalViewComponent
} from './views/employee/employee-view/employee-local-view/employee-local-view.component';
import {NgOptimizedImage} from '@angular/common';
import {EmployeeSharedViewComponent} from './views/employee/employee-shared-view/employee-shared-view.component';
import {SharedDirListComponent} from './components/docs/shared-dir-list/shared-dir-list.component';
import {SharedFileSpanComponent} from './components/docs/shared-file-span/shared-file-span.component';


@NgModule({
  declarations: [AppComponent,
    LoginViewComponent,
    LoginFormComponent,
    EmployeeHeaderComponent,
    EmployeeViewComponent,
    DirListComponent,
    FileSpanComponent,
    EmployeeLocalViewComponent,
    EmployeeSharedViewComponent,
    SharedDirListComponent,
    SharedFileSpanComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    MatGridListModule,
    MatTableModule,
    ModalModule,
    NgOptimizedImage
  ],
  exports: [
    EmployeeHeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
