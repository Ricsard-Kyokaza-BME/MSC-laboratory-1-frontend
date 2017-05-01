import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RlTagInputModule} from 'angular2-tag-input/dist';
import {UiSwitchModule} from 'ngx-ui-switch/src';
import {DndModule} from 'ng2-dnd';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginCmp} from './login/login.component';
import {CreateBacklogItemComponent} from './backlogItem/create.component';
import {CreateProjectComponent} from './project/create.component';
import {CreateSprintComponent} from './sprint/create.component';
import {ProjectListComponent} from './project/list.component';
import {LoadComponent} from './load.component';
import {RemoveUnderscorePipe} from './utility/removeUnderscore.pipe';
import {CapitalizePipe} from './utility/capitalize.pipe';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardColumnComponent} from './dashboard/column.component';
import {UserRESTService} from './user/userREST.service';
import {BacklogItemRESTService} from 'app/backlogItem/backlogItemREST.service';
import {SessionService} from './auth/session.service';
import * as $ from 'jquery';

const appRoutes: Routes = [
  { path: 'login', component: LoginCmp },
  { path: 'backlog-item/:dashboardId/create', component: CreateBacklogItemComponent },
  { path: 'project/create', component: CreateProjectComponent },
  { path: 'project/edit/:id', component: CreateProjectComponent },
  { path: 'project/:id/sprint/create', component: CreateSprintComponent },
  { path: ':type/edit/:dashboardId/:id', component: CreateBacklogItemComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: '', component: LoadComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginCmp,
    DashboardColumnComponent,
    DashboardComponent,
    CreateBacklogItemComponent,
    CreateProjectComponent,
    CreateSprintComponent,
    ProjectListComponent,
    LoadComponent,
    CapitalizePipe,
    RemoveUnderscorePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    DndModule.forRoot(),
    UiSwitchModule,
    RlTagInputModule
  ],
  providers: [
    SessionService,
    BacklogItemRESTService,
    UserRESTService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
