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
import {BacklogItemRESTService} from "./backlogItem/backlogItemREST.service";
import {UserRESTService} from "./user/userREST.service";
import {CreateProjectComponent} from "./project/createProject.component";
import {ProjectListComponent} from "./project/projectList.component";
import {LoadComponent} from "./load.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginCmp },
  { path: 'backlog-item/create', component: CreateBacklogItemComponent },
  { path: 'project/create', component: CreateProjectComponent },
  { path: ':type/edit/:id', component: CreateBacklogItemComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: '', component: LoadComponent },
];

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    DndModule.forRoot(),
    MaterializeModule
  ],
  declarations: [
    AppComponent,
    LoginCmp,
    DashboardComponent,
    CreateBacklogItemComponent,
    CreateProjectComponent,
    ProjectListComponent,
    LoadComponent,
    CapitalizePipe,
    RemoveUnderscorePipe
  ],
  providers: [
    SessionService,
    BacklogItemRESTService,
    UserRESTService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
