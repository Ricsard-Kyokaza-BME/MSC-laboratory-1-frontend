import {Component} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";

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
    this.backlogItems.push(new UserStory('1', 'Test 1'));
    this.backlogItems.push(new UserStory('2', 'Test 2'));
    this.backlogItems.push(new UserStory('3', 'Test 3'));
    this.backlogItems.push(new UserStory('4', 'Test 4'));

    this.todoItems.push(new UserStory('5', 'Test 5'));
    this.todoItems.push(new UserStory('6', 'Test 6'));
    this.todoItems.push(new UserStory('7', 'Test 7'));

    this.inProgressItems.push(new UserStory('8', 'Test 8'));
    this.inProgressItems.push(new UserStory('9', 'Test 9'));
    this.inProgressItems.push(new UserStory('10', 'Test 10'));

    this.doneItems.push(new UserStory('11', 'Test 11'));
    this.doneItems.push(new UserStory('12', 'Test 12'));

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
