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
import {CreateBacklogItemComponent} from "./backlogItem/createBacklogItem.component";
import {MaterializeModule} from "angular2-materialize";
import {CapitalizePipe} from "./utility/capitalize.pipe";
import {RemoveUnderscorePipe} from "./utility/removeUnderscore.pipe";
import {SelectComponent, SelectModule} from "ng2-select";

const appRoutes: Routes = [
  { path: 'login', component: LoginCmp },
  { path: 'backlog-item/create', component: CreateBacklogItemComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    DndModule.forRoot(),
    MaterializeModule,
    SelectModule
  ],
  declarations: [
    AppComponent,
    LoginCmp,
    DashboardComponent,
    CreateBacklogItemComponent,
    CapitalizePipe,
    RemoveUnderscorePipe
  ],
  providers: [
    SessionService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
