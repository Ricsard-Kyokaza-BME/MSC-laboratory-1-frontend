import {Component, Inject, Input} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {plainToClass} from "class-transformer";
import {Bug} from "../models/bug";
import {Task} from "../models/task";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {SessionService} from "../auth/session.service";
import {Project} from "../models/project";
import {Utility} from "../utility/utility";
import {Dashboard} from "../models/dashboard";
import {BacklogItemType} from "../models/backlogItemType";
import * as _ from "underscore";
import * as moment from "moment";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html',
  animations: [ Utility.fadeInOutAnimation ]
})
export class DashboardComponent {
  @Input() project: Project;

  sessionService: SessionService;
  backlogItemType = BacklogItemType;
  backlogStatus = BacklogStatus;

  backlogItems: Array<BacklogItem>;
  todoItems: Array<BacklogItem>;
  inProgressItems: Array<BacklogItem>;
  doneItems: Array<BacklogItem>;

  dashboard: Dashboard;

  orderSwitches: {backlogSwitch: boolean, todoSwitch: boolean, inProgressSwitch: boolean, doneSwitch: boolean};
  orderSwitchesDisabled: {backlogSwitch: boolean, todoSwitch: boolean, inProgressSwitch: boolean, doneSwitch: boolean};
  isOpen: boolean;
  isLoaded: boolean;

  constructor(@Inject(Http) private _http: Http, private _router: Router, sessionService: SessionService) {
    this.sessionService = sessionService;

    this.backlogItems= [];
    this.todoItems= [];
    this.inProgressItems= [];
    this.doneItems= [];

    this.orderSwitches = { backlogSwitch: false, todoSwitch: false, inProgressSwitch: false, doneSwitch: false };
    this.orderSwitchesDisabled = { backlogSwitch: true, todoSwitch: false, inProgressSwitch: false, doneSwitch: false };
    this.isOpen = false;
    this.isLoaded = false;
  }

  dashboardToggle() {
    this.isOpen = !this.isOpen;
    if(this.isOpen && !this.isLoaded) {
      this.project.getDashboard(this._http).subscribe(
        res => {
          this.dashboard = plainToClass(Dashboard, <Dashboard><any>res);

          this.dashboard.backlog = this.mapDashboardItems(this.dashboard.backlog);
          this.dashboard.todo = this.mapDashboardItems(this.dashboard.todo);
          this.dashboard.inProgress = this.mapDashboardItems(this.dashboard.inProgress);
          this.dashboard.done = this.mapDashboardItems(this.dashboard.done);

          this.isLoaded = true;
        },
        error =>  console.log(error));
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

  mapDashboardItems(res:any[]): Array<BacklogItem> {
    let that = this;
    let instantiatedItems: Array<BacklogItem> = [];

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

  updateDashboard(type: string, backlogItem: BacklogItem) {
    let tmpDashboard = jQuery.extend(true, {}, this.dashboard);

    tmpDashboard.backlog = _.map(tmpDashboard.backlog, function (element: any) { return element.id; });
    tmpDashboard.todo = _.map(tmpDashboard.todo, function (element: any) { return element.id; });
    tmpDashboard.inProgress = _.map(tmpDashboard.inProgress, function (element: any) { return element.id; });
    tmpDashboard.done = _.map(tmpDashboard.done, function (element: any) { return element.id; });

    tmpDashboard.backlog = this.toObject(tmpDashboard.backlog);
    tmpDashboard.todo = this.toObject(tmpDashboard.todo);
    tmpDashboard.inProgress = this.toObject(tmpDashboard.inProgress);
    tmpDashboard.done = this.toObject(tmpDashboard.done);

    if(type === 'sort') {
      tmpDashboard.update(this._http).subscribe(
        res =>    '',
        error =>  console.log(error));
    } else {
      tmpDashboard.updateAfterDragnDrop(this._http, backlogItem).subscribe(
        res =>    '',
        error =>  console.log(error));
    }
  }

  dashboardItemClicked(item: BacklogItem): void {
    this._router.navigate(['/' + item.getPath() + 'edit/' + this.project.dashboardId + '/' + item.id ]);
  }

  dropDnDItem($event: {dragData: any, mouseEvent: MouseEvent}, status: BacklogStatus, type: string): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[status];
    this.dashboard[type].push(item);
  }

  removeDnDItem($event: {dragData: any, mouseEvent: MouseEvent}, type: string): void {
    let backlogItem: BacklogItem = <BacklogItem>$event.dragData;
    this.removeItem(backlogItem, this.dashboard[type]);
    this.updateDashboard('dnd', backlogItem);
  }

  onSortSuccess($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let backlogItem: BacklogItem = <BacklogItem>$event.dragData;
    this.updateDashboard('sort', backlogItem);
  }

  private removeItem(item: BacklogItem, array: Array<BacklogItem>): void {
    array.splice(array.indexOf(item), 1);
  }

  isInTheSprint(itemId: string): boolean {
    if(this.dashboard && this.dashboard.sprint) {
      return _.contains(this.dashboard.sprint.backlogItemsInvolved, itemId);
    } else {
      return false;
    }
  }

  formatDate(date: any): string {
    return moment(date).format('YYYY-MM-DD');
  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }

}
