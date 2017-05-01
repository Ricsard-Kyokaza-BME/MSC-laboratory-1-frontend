import {Component, Inject, Input} from '@angular/core';
import {BacklogItem} from '../models/backlogItem';
import {BacklogStatus} from '../models/backlogStatus';
import {UserStory} from '../models/userStory';
import {plainToClass} from 'class-transformer';
import {Bug} from '../models/bug';
import {Task} from '../models/task';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {SessionService} from '../auth/session.service';
import {Project} from '../models/project';
import {Utility} from '../utility/utility';
import {Dashboard} from '../models/dashboard';
import {BacklogItemType} from '../models/backlogItemType';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.html',
  animations: [Utility.fadeInOutAnimation]
})
export class DashboardComponent {
  @Input() project: Project;

  SessionService = SessionService;
  sessionService: SessionService;
  backlogItemType = BacklogItemType;
  backlogStatus = BacklogStatus;

  dashboard: Dashboard;

  isOpen: boolean;
  isLoaded: boolean;

  constructor(@Inject(Http) private _http: Http, private _router: Router, sessionService: SessionService) {
    this.sessionService = sessionService;

    this.isOpen = false;
    this.isLoaded = false;
  }

  dashboardToggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && !this.isLoaded) {
      this.project.getDashboard(this._http).subscribe(
        res => {
          this.dashboard = plainToClass(Dashboard, <Dashboard><any>res);

          this.dashboard.backlog = this.mapDashboardItems(this.dashboard.backlog);
          this.dashboard.todo = this.mapDashboardItems(this.dashboard.todo);
          this.dashboard.inProgress = this.mapDashboardItems(this.dashboard.inProgress);
          this.dashboard.done = this.mapDashboardItems(this.dashboard.done);

          this.isLoaded = true;
        },
        error => console.log(error));
    }
  }

  goToEditProject() {
    this._router.navigate(['project/edit/' + this.project.id]);
  }

  goToCreateBacklogItem() {
    this._router.navigate(['/backlog-item/' + this.project.dashboardId + '/create']);
  }

  goToCreateSprint() {
    this._router.navigate(['project/' + this.project.id + '/sprint/create']);
  }

  mapDashboardItems(res: any[]): Array<BacklogItem> {
    const that = this;
    const instantiatedItems: Array<BacklogItem> = [];

    res.forEach(function (element) {
      instantiatedItems.push(that.instantiateBacklogItem(element));
    });

    return instantiatedItems;
  }

  instantiateBacklogItem(res: any): BacklogItem {
    switch (res.type) {
      case BacklogItemType[BacklogItemType.USER_STORY]:
        return UserStory.instantiate(res);
      case BacklogItemType[BacklogItemType.TASK]:
        return Task.instantiate(res);
      case BacklogItemType[BacklogItemType.BUG]:
        return Bug.instantiate(res);
    }
  }

  updateDashboardListener(event: { type: string, backlogItem: BacklogItem }) {
    const tmpDashboard = jQuery.extend(true, {}, this.dashboard);

    tmpDashboard.backlog = _.map(tmpDashboard.backlog, function (element: any) {
      return element.id;
    });
    tmpDashboard.todo = _.map(tmpDashboard.todo, function (element: any) {
      return element.id;
    });
    tmpDashboard.inProgress = _.map(tmpDashboard.inProgress, function (element: any) {
      return element.id;
    });
    tmpDashboard.done = _.map(tmpDashboard.done, function (element: any) {
      return element.id;
    });

    tmpDashboard.backlog = this.toObject(tmpDashboard.backlog);
    tmpDashboard.todo = this.toObject(tmpDashboard.todo);
    tmpDashboard.inProgress = this.toObject(tmpDashboard.inProgress);
    tmpDashboard.done = this.toObject(tmpDashboard.done);

    if (event.type === 'sort') {
      tmpDashboard.update(this._http).subscribe(
        res => '',
        error => console.log(error));
    } else {
      tmpDashboard.updateAfterDragnDrop(this._http, event.backlogItem).subscribe(
        res => '',
        error => console.log(error));
    }
  }

  formatDate(date: any): string {
    return moment(date).format('YYYY-MM-DD');
  }

  toObject(arr) {
    const rv = {};
    for (let i = 0; i < arr.length; ++i) {
      rv[i] = arr[i];
    }

    return rv;
  }

}
