import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import {LoginCmp} from "./login/login.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {SessionService} from "./auth/session.service";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {MaterialModule} from "@angular/material";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {ButtonModule} from "primeng/components/button/button";
import {PanelModule} from "primeng/components/panel/panel";
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
    DragulaModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    InputTextModule,
    ButtonModule,
    PanelModule,
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
