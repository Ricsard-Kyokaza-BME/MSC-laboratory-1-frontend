import {Component, OnInit} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {Observable} from "rxjs";
import {Response, Http} from "@angular/http";
import {plainToClass} from "class-transformer";
import {Bug} from "../models/bug";
import {Task} from "../models/task";
import {BacklogItemRESTService} from "../backlogItem/backlogItemREST.service";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent implements OnInit {
  backlogItems: Array<BacklogItem> = [];
  todoItems: Array<BacklogItem> = [];
  inProgressItems: Array<BacklogItem> = [];
  doneItems: Array<BacklogItem> = [];
  orderSwitches: {backlogSwitch: boolean, todoSwitch: boolean,
    inProgressSwitch: boolean, doneSwitch: boolean} = {
    backlogSwitch: false, todoSwitch: false,
    inProgressSwitch: false, doneSwitch: false
  };
  orderSwitchesDisabled: {backlogSwitch: boolean, todoSwitch: boolean,
    inProgressSwitch: boolean, doneSwitch: boolean} = {
    backlogSwitch: true, todoSwitch: false,
    inProgressSwitch: false, doneSwitch: false
  };

  constructor(private http: Http, private _backlogItemRESTService: BacklogItemRESTService) {
    //TEST DATA
    // this.backlogItems.push(new UserStory('1', 'Test 1'));
    // this.backlogItems.push(new UserStory('2', 'Test 2'));
    // this.backlogItems.push(new UserStory('3', 'Test 3'));
    // this.backlogItems.push(new UserStory('4', 'Test 4'));
    //
    // this.todoItems.push(new UserStory('5', 'Test 5'));
    // this.todoItems.push(new UserStory('6', 'Test 6'));
    // this.todoItems.push(new UserStory('7', 'Test 7'));
    //
    // this.inProgressItems.push(new UserStory('8', 'Test 8'));
    // this.inProgressItems.push(new UserStory('9', 'Test 9'));
    // this.inProgressItems.push(new UserStory('10', 'Test 10'));
    //
    // this.doneItems.push(new UserStory('11', 'Test 11'));
    // this.doneItems.push(new UserStory('12', 'Test 12'));

  }

  ngOnInit(): void {
    let self = this;
    this._backlogItemRESTService.getBacklogItemsByStatus()
      .subscribe(
        res => {
          console.log(res);
          self.backlogItems.push.apply(self.backlogItems, plainToClass(UserStory, res['userStory']['backlog']));
          self.backlogItems.push.apply(self.backlogItems, plainToClass(Task, res['task']['backlog']));
          self.backlogItems.push.apply(self.backlogItems, plainToClass(Bug, res['bug']['backlog']));

          self.todoItems.push.apply(self.todoItems, plainToClass(UserStory, res['userStory']['todo']));
          self.todoItems.push.apply(self.todoItems, plainToClass(Task, res['task']['todo']));
          self.todoItems.push.apply(self.todoItems, plainToClass(Bug, res['bug']['todo']));

          self.inProgressItems.push.apply(self.inProgressItems, plainToClass(UserStory, res['userStory']['inProgress']));
          self.inProgressItems.push.apply(self.inProgressItems, plainToClass(Task, res['task']['inProgress']));
          self.inProgressItems.push.apply(self.inProgressItems, plainToClass(Bug, res['bug']['inProgress']));

          self.doneItems.push.apply(self.doneItems, plainToClass(UserStory, res['userStory']['done']));
          self.doneItems.push.apply(self.doneItems, plainToClass(Task, res['task']['done']));
          self.doneItems.push.apply(self.doneItems, plainToClass(Bug, res['bug']['done']));
        },
        error =>  console.log(error));
  }

  dropToBacklog($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.BACKLOG;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error)
    );
    this.backlogItems.push(item);
  }

  dropToTodo($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.TODO;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error)
    );
    this.todoItems.push(item);
  }

  dropToInProgress($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.IN_PROGRESS;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error)
    );
    this.inProgressItems.push(item);
  }

  dropToDone($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus.DONE;
    this._backlogItemRESTService.updateBacklogItem(item).subscribe(
      res => console.log(res),
      error =>  console.log(error)
    );
    this.doneItems.push(item);
  }

  removeBacklogItem($event: {dragData: any, mouseEvent: MouseEvent}) {
    this.removeItem(<BacklogItem>$event.dragData, this.backlogItems);
  }

  removeTodoItem($event: {dragData: any, mouseEvent: MouseEvent}) {
    this.removeItem(<BacklogItem>$event.dragData, this.todoItems);
  }

  removeInProgressItem($event: {dragData: any, mouseEvent: MouseEvent}) {
    this.removeItem(<BacklogItem>$event.dragData, this.inProgressItems);
  }

  removeDoneItem($event: {dragData: any, mouseEvent: MouseEvent}) {
    this.removeItem(<BacklogItem>$event.dragData, this.doneItems);
  }

  private removeItem(item: BacklogItem, array: Array<BacklogItem>) {
    array.splice(array.indexOf(item), 1);
  }

}
