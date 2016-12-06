import {Component} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent {
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

  constructor() {
    //TEST DATA
    // this.backlogItems.push(new BacklogItem('1', 'Test 1', BacklogStatus.BACKLOG));
    // this.backlogItems.push(new BacklogItem('2', 'Test 2', BacklogStatus.BACKLOG));
    // this.backlogItems.push(new BacklogItem('3', 'Test 3', BacklogStatus.BACKLOG));
    // this.backlogItems.push(new BacklogItem('4', 'Test 4', BacklogStatus.BACKLOG));
    //
    // this.todoItems.push(new BacklogItem('5', 'Test 5', BacklogStatus.BACKLOG));
    // this.todoItems.push(new BacklogItem('6', 'Test 6', BacklogStatus.BACKLOG));
    // this.todoItems.push(new BacklogItem('7', 'Test 7', BacklogStatus.BACKLOG));
    //
    // this.inProgressItems.push(new BacklogItem('8', 'Test 8', BacklogStatus.BACKLOG));
    // this.inProgressItems.push(new BacklogItem('9', 'Test 9', BacklogStatus.BACKLOG));
    // this.inProgressItems.push(new BacklogItem('10', 'Test 10', BacklogStatus.BACKLOG));
    //
    // this.doneItems.push(new BacklogItem('11', 'Test 11', BacklogStatus.BACKLOG));
    // this.doneItems.push(new BacklogItem('12', 'Test 12', BacklogStatus.BACKLOG));

  }

  dropToBacklog($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    this.backlogItems.push(item);
  }

  dropToTodo($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    this.todoItems.push(item);
  }

  dropToInProgress($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    this.inProgressItems.push(item);
  }

  dropToDone($event: {dragData: any, mouseEvent: MouseEvent}) {
    let item: BacklogItem = <BacklogItem>$event.dragData;
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
