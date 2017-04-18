import {Component, OnInit, Inject, Input} from '@angular/core';
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
import * as _ from "underscore"

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html',
  animations: [ Utility.fadeInOutAnimation ]
})
export class DashboardComponent implements OnInit {
  @Input() project: Project;

  sessionService: SessionService;
  backlogItemType = BacklogItemType;

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

  ngOnInit(): void {
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

  goToCreateBacklogItem() {
    this._router.navigate(['/backlog-item/' + this.project.dashboardId + '/create'])
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

  dashboardItemClicked(item: BacklogItem): void {
    this._router.navigate(['/' + item.getPath() + 'edit/' + this.project.dashboardId + '/' + item.id ]);
  }

  dropToBacklog($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[BacklogStatus.BACKLOG];
    this.dashboard.backlog.push(item);
    this.updateDashboard();
  }

  dropToTodo($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[BacklogStatus.TODO];
    this.dashboard.todo.push(item);
    this.updateDashboard();
  }

  dropToInProgress($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[BacklogStatus.IN_PROGRESS];
    this.dashboard.inProgress.push(item);
    this.updateDashboard();
  }

  dropToDone($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[BacklogStatus.DONE];
    this.dashboard.done.push(item);
    this.updateDashboard();
  }

  updateDashboard() {
    let tmpDashboard = jQuery.extend(true, {}, this.dashboard);
    tmpDashboard.backlog = _.map(tmpDashboard.backlog, function (element: any) { return element.id; });
    tmpDashboard.todo = _.map(tmpDashboard.todo, function (element: any) { return element.id; });
    tmpDashboard.inProgress = _.map(tmpDashboard.inProgress, function (element: any) { return element.id; });
    tmpDashboard.done = _.map(tmpDashboard.done, function (element: any) { return element.id; });

    tmpDashboard.update(this._http).subscribe(
      res =>    '',
      error =>  console.log(error));
  }

  removeBacklogItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.dashboard.backlog);
  }

  removeTodoItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.dashboard.todo);
  }

  removeInProgressItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.dashboard.inProgress);
  }

  removeDoneItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.dashboard.done);
  }

  private removeItem(item: BacklogItem, array: Array<BacklogItem>): void {
    array.splice(array.indexOf(item), 1);
  }

  onSortSuccess($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.updateDashboard();
  }

}
