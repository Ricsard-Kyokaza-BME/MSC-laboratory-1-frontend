import {Component, OnInit, Inject, Input} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {plainToClass} from "class-transformer";
import {Bug} from "../models/bug";
import {Task} from "../models/task";
import {BacklogItemRESTService} from "../backlogItem/backlogItemREST.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {SessionService} from "../auth/session.service";
import {Project} from "../models/project";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent implements OnInit {
  @Input() project: Project;

  sessionService: SessionService;

  backlogItems: Array<BacklogItem>;
  todoItems: Array<BacklogItem>;
  inProgressItems: Array<BacklogItem>;
  doneItems: Array<BacklogItem>;
  orderSwitches: {backlogSwitch: boolean, todoSwitch: boolean, inProgressSwitch: boolean, doneSwitch: boolean};
  orderSwitchesDisabled: {backlogSwitch: boolean, todoSwitch: boolean, inProgressSwitch: boolean, doneSwitch: boolean};
  isOpen: boolean;

  constructor(@Inject(Http) private _http: Http, private _backlogItemRESTService: BacklogItemRESTService,
              private _router: Router, sessionService: SessionService) {
    this.sessionService = sessionService;

    this.backlogItems= [];
    this.todoItems= [];
    this.inProgressItems= [];
    this.doneItems= [];
    this.orderSwitches = { backlogSwitch: false, todoSwitch: false, inProgressSwitch: false, doneSwitch: false };
    this.orderSwitchesDisabled = { backlogSwitch: true, todoSwitch: false, inProgressSwitch: false, doneSwitch: false };
    this.isOpen = false;
  }

  ngOnInit(): void {
    // this._backlogItemRESTService.getBacklogItemsByStatus().subscribe(
    //   res => {
    //     this.mapDashboardItems(this.backlogItems, res, 'backlog');
    //     this.mapDashboardItems(this.todoItems, res, 'todo');
    //     this.mapDashboardItems(this.inProgressItems, res, 'inProgress');
    //     this.mapDashboardItems(this.doneItems, res, 'done');
    //   },
    //   error =>  console.log(error));
  }

  dashboardToggle() {
    this.isOpen = !this.isOpen;
    this.project.resolveProject(this._http).subscribe(
      res => {
        this.mapDashboardItems(this.backlogItems, res, 'backlog');
        this.mapDashboardItems(this.todoItems, res, 'todo');
        this.mapDashboardItems(this.inProgressItems, res, 'inProgress');
        this.mapDashboardItems(this.doneItems, res, 'done');
      },
      error =>  console.log(error));
  }

  goToCreateBacklogItem() {
    this._router.navigate(['/backlog-item/' + this.project.dashboardId + '/create'])
  }

  mapDashboardItems(targetArray: Array<BacklogItem>, res:any[], status: string): void {
    targetArray.push.apply(targetArray, plainToClass(UserStory, res['userStory'][status]));
    targetArray.push.apply(targetArray, plainToClass(Task, res['task'][status]));
    targetArray.push.apply(targetArray, plainToClass(Bug, res['bug'][status]));
  }

  dashboardItemClicked(item: BacklogItem): void {
    this._router.navigate(['/' + item.getPath() + 'edit/' + this.project.dashboardId + '/' + item.id ]);
  }

  dropToBacklog($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.BACKLOG;
    this.updateBacklogItem(item);
    this.backlogItems.push(item);
  }

  dropToTodo($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.TODO;
    this.updateBacklogItem(item);
    this.todoItems.push(item);
  }

  dropToInProgress($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.IN_PROGRESS;
    this.updateBacklogItem(item);
    this.inProgressItems.push(item);
  }

  dropToDone($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.DONE;
    this.updateBacklogItem(item);
    this.doneItems.push(item);
  }

  updateBacklogItem(item: BacklogItem): void {
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res =>    '',
      error =>  console.log(error));
  }

  removeBacklogItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.backlogItems);
  }

  removeTodoItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.todoItems);
  }

  removeInProgressItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.inProgressItems);
  }

  removeDoneItem($event: {dragData: any, mouseEvent: MouseEvent}): void {
    this.removeItem(<BacklogItem>$event.dragData, this.doneItems);
  }

  private removeItem(item: BacklogItem, array: Array<BacklogItem>): void {
    array.splice(array.indexOf(item), 1);
  }

}
