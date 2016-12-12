import {Component, ViewEncapsulation} from '@angular/core';
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

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent {
  backlogItem: BacklogItem;
  typeRadio: string;
  searchUserOptions: Array<any> = [];
  backlogStatus = BacklogStatus;
  complexity = Complexity;
  searchedUsers: Array<User> = [];
  assigneeSearch: string;
  selectedAssignees: Array<User> = [];

  constructor(private http: Http) {
    this.backlogItem = new UserStory();
    this.typeRadio = 'userStory';

  }

  addKeyword(chip: any) {
    !this.backlogItem.keywords ? this.backlogItem.keywords = [] : '';
    this.backlogItem.keywords.push(chip.tag);
  }

  deleteKeyword(chip: any) {
    this.backlogItem.keywords.splice(this.backlogItem.keywords.indexOf(chip.tag), 1);
  }

  addAssignee(item: any) {
    console.log(item);
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

  saveBacklogItem() {
    var mappedUserIds: Array<string> = [];
    for(let i = 0; i < this.selectedAssignees.length; i++) {
      mappedUserIds.push(this.selectedAssignees[i].id);
    }
    this.backlogItem.assignee = mappedUserIds;
    let tmpItem = plainToClass(Bug, this.backlogItem);

    this.backlogItemSend(tmpItem)
      .subscribe(
        res => console.log(res),
        error =>  console.log(error));

    return false;
  }

  backlogItemSend(backlogItem: BacklogItem): Observable<any[]> {
    return this.http.post('/api/bug', backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this.http.post('/user/getUser', { keyword: text })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
