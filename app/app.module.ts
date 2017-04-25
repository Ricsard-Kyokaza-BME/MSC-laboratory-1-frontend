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
import {CreateBacklogItemComponent} from "./backlogItem/create.component";
import {CapitalizePipe} from "./utility/capitalize.pipe";
import {RemoveUnderscorePipe} from "./utility/removeUnderscore.pipe";
import {BacklogItemRESTService} from "./backlogItem/backlogItemREST.service";
import {UserRESTService} from "./user/userREST.service";
import {CreateProjectComponent} from "./project/create.component";
import {ProjectListComponent} from "./project/list.component";
import {LoadComponent} from "./load.component";
import {UiSwitchModule} from "angular2-ui-switch";
import {RlTagInputModule} from "angular2-tag-input";
import {CreateSprintComponent} from "./sprint/create.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginCmp },
  { path: 'backlog-item/:dashboardId/create', component: CreateBacklogItemComponent },
  { path: 'project/create', component: CreateProjectComponent },
  { path: 'project/:id/sprint/create', component: CreateSprintComponent },
  { path: ':type/edit/:dashboardId/:id', component: CreateBacklogItemComponent },
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
    UiSwitchModule,
    RlTagInputModule
  ],
  declarations: [
    AppComponent,
    LoginCmp,
    DashboardComponent,
    CreateBacklogItemComponent,
    CreateProjectComponent,
    CreateSprintComponent,
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
