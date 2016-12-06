import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import {LoginCmp} from "./login/login.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {SessionService} from "./auth/session.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DndModule} from "ng2-dnd";

const appRoutes: Routes = [
  { path: 'login', component: LoginCmp },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginCmp,
    DashboardComponent
  ],
  providers: [
    SessionService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
