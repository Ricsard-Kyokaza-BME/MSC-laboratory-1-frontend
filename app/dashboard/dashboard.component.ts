import {Component, OnInit} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {plainToClass} from "class-transformer";
import {Bug} from "../models/bug";
import {Task} from "../models/task";
import {BacklogItemRESTService} from "../backlogItem/backlogItemREST.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent implements OnInit {
  backlogItems: Array<BacklogItem>;
  todoItems: Array<BacklogItem>;
  inProgressItems: Array<BacklogItem>;
  doneItems: Array<BacklogItem>;
  orderSwitches: {backlogSwitch: boolean, todoSwitch: boolean,
    inProgressSwitch: boolean, doneSwitch: boolean};
  orderSwitchesDisabled: {backlogSwitch: boolean, todoSwitch: boolean,
    inProgressSwitch: boolean, doneSwitch: boolean};

  constructor(private _backlogItemRESTService: BacklogItemRESTService, private _router: Router) {
    this.backlogItems= [];
    this.todoItems= [];
    this.inProgressItems= [];
    this.doneItems= [];
    this.orderSwitches = {
      backlogSwitch: false, todoSwitch: false,
      inProgressSwitch: false, doneSwitch: false
    };
    this.orderSwitchesDisabled = {
      backlogSwitch: true, todoSwitch: false,
      inProgressSwitch: false, doneSwitch: false
    };
  }

  ngOnInit(): void {
    this._backlogItemRESTService.getBacklogItemsByStatus()
      .subscribe(
        res => {
          this.backlogItems.push.apply(this.backlogItems, plainToClass(UserStory, res['userStory']['backlog']));
          this.backlogItems.push.apply(this.backlogItems, plainToClass(Task, res['task']['backlog']));
          this.backlogItems.push.apply(this.backlogItems, plainToClass(Bug, res['bug']['backlog']));

          this.todoItems.push.apply(this.todoItems, plainToClass(UserStory, res['userStory']['todo']));
          this.todoItems.push.apply(this.todoItems, plainToClass(Task, res['task']['todo']));
          this.todoItems.push.apply(this.todoItems, plainToClass(Bug, res['bug']['todo']));

          this.inProgressItems.push.apply(this.inProgressItems, plainToClass(UserStory, res['userStory']['inProgress']));
          this.inProgressItems.push.apply(this.inProgressItems, plainToClass(Task, res['task']['inProgress']));
          this.inProgressItems.push.apply(this.inProgressItems, plainToClass(Bug, res['bug']['inProgress']));

          this.doneItems.push.apply(this.doneItems, plainToClass(UserStory, res['userStory']['done']));
          this.doneItems.push.apply(this.doneItems, plainToClass(Task, res['task']['done']));
          this.doneItems.push.apply(this.doneItems, plainToClass(Bug, res['bug']['done']));
        },
        error =>  console.log(error));
  }

  dashboardItemClicked(item: BacklogItem): void {
    this._router.navigate(['/' + this._backlogItemRESTService.getPath(item.type) + '/edit/' + item.id ]);
  }

  dropToBacklog($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.BACKLOG;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error));
    this.backlogItems.push(item);
  }

  dropToTodo($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.TODO;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error));
    this.todoItems.push(item);
  }

  dropToInProgress($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.IN_PROGRESS;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error));
    this.inProgressItems.push(item);
  }

  dropToDone($event: {dragData: any, mouseEvent: MouseEvent}): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.DONE;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error));
    this.doneItems.push(item);
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
