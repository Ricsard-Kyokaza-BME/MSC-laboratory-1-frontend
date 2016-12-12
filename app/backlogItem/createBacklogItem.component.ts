import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Bug} from "../models/bug";
import {Complexity} from "../models/complexity";
import {plainToClass} from "class-transformer";
import {Task} from "../models/task";
import {BacklogItemRESTService} from "./backlogItemREST.service";

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent implements OnInit {
  backlogItem: BacklogItem;
  typeRadio: string;
  searchUserOptions: Array<any> = [];
  backlogStatus = BacklogStatus;
  complexity = Complexity;
  searchedUsers: Array<User> = [];
  assigneeSearch: string;
  selectedAssignees: Array<User> = [];
  backlogItems: Map<string, Array<BacklogItem>> = new Map<string, Array<BacklogItem>>();
  selectedDependingItems: Array<BacklogItem> = [];

  constructor(private http: Http, private _backlogItemRESTService: BacklogItemRESTService) {
    this.backlogItem = new UserStory();
    this.typeRadio = 'userStory';
  }

  ngOnInit(): void {
    let self = this;
    this._backlogItemRESTService.getBacklogItems()
      .subscribe(
        res => {
          console.log(res);
          self.backlogItems.set('userStory', plainToClass(UserStory, res['userStory']));
          self.backlogItems.set('task', plainToClass(UserStory, res['task']));
          self.backlogItems.set('bug', plainToClass(UserStory, res['bug']));
        },
        error =>  console.log(error));
  }

  radioButtonClicked(type: string) {
    switch (type) {
      case 'userStory':
        this.backlogItem = new UserStory();
        break;
      case 'task':
        this.backlogItem = new Task();
        break;
      case 'bug':
        this.backlogItem = new Bug();
        break;
    }
  }

  addKeyword(chip: any) {
    !this.backlogItem.keywords ? this.backlogItem.keywords = [] : '';
    this.backlogItem.keywords.push(chip.tag);
  }

  deleteKeyword(chip: any) {
    this.backlogItem.keywords.splice(this.backlogItem.keywords.indexOf(chip.tag), 1);
  }

  assigneeClicked(assignee: User) {
    this.selectedAssignees.push(assignee);
  }

  assigneeRemoved(assignee: User) {
    this.selectedAssignees.splice(this.selectedAssignees.indexOf(assignee), 1);
  }

  assigneeTyped(text: any) {
    console.log(text);
    if(text) {
      let self = this;
      this.userSearchSend(text)
        .subscribe(
          res => {
            console.log(res);
            self.searchedUsers = plainToClass(User, res);
          },
          error =>  console.log(error));
    } else {
      this.searchedUsers.length = 0;
    }
  }

  addDependingItem(item: BacklogItem) {
    this.selectedDependingItems.push(item);
  }

  dependingItemRemoved(item: BacklogItem) {
    this.selectedDependingItems.splice(this.selectedDependingItems.indexOf(item), 1);
  }

  saveBacklogItem() {
    var mappedUserIds: Array<string> = [];
    for(let i = 0; i < this.selectedAssignees.length; i++) {
      mappedUserIds.push(this.selectedAssignees[i].id);
    }
    var mappedItemIds: Array<string> = [];
    for(let i = 0; i < this.selectedDependingItems.length; i++) {
      mappedItemIds.push(this.selectedDependingItems[i].id);
    }
    this.backlogItem.assignee = mappedUserIds;
    this.backlogItem.depending = mappedItemIds;

    this.backlogItemSend(this.backlogItem)
      .subscribe(
        res => console.log(res),
        error =>  console.log(error));

    return false;
  }

  backlogItemSend(backlogItem: BacklogItem): Observable<any[]> {
    var path: string;
    switch (this.typeRadio) {
      case 'userStory':
        path = 'userstory';
        break;
      case 'task':
        path = 'task';
        break;
      case 'bug':
        path = 'bug';
        break;
    }
    return this.http.post('/api/' + path, backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this.http.post('/user/getUser', { keyword: text })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
