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
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent implements OnInit {
  id: string;
  type: string;
  isEditing: boolean = false;
  backlogItem: BacklogItem;
  typeRadio: string;
  keywords: any;
  searchUserOptions: Array<any> = [];
  backlogStatus = BacklogStatus;
  complexity = Complexity;
  searchedUsers: Array<User> = [];
  assigneeSearch: string;
  selectedAssignees: Array<User> = [];
  backlogItems: Map<string, Array<BacklogItem>> = new Map<string, Array<BacklogItem>>();
  selectedDependingItems: Array<BacklogItem> = [];

  constructor(private http: Http, private _backlogItemRESTService: BacklogItemRESTService,
              private route: ActivatedRoute, private router: Router) {
    this.backlogItem = new UserStory();
    this.typeRadio = 'userStory';
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
    if(this.id && this.type) {
      this.isEditing = true;
    }
  }

  ngOnInit(): void {
    let self = this;

    if(this.isEditing) {
      this._backlogItemRESTService.getBacklogItem(this.id, this.type).subscribe(
        res => {
          console.log(res);
          switch (this.type) {
            case 'userstory':
              this.backlogItem = plainToClass(UserStory, <BacklogItem><any>res);
              break;
            case 'task':
              this.backlogItem = plainToClass(Task, <BacklogItem><any>res);
              break;
            case 'bug':
              this.backlogItem = plainToClass(Bug, <BacklogItem><any>res);
              break;
          }

          this.keywords = { data: [] };
          for(let i = 0; i < this.backlogItem.keywords.length; i++) {
            this.keywords.data.push({ tag: this.backlogItem.keywords[i] });
          }

          this.resolveUserIds(this.backlogItem.assignee).subscribe(
            res => {
              console.log(res);
              self.selectedAssignees = plainToClass(User, res);
            },
            error =>  console.log(error));

          this.resolveTaskIds(this.backlogItem.depending).subscribe(
            res => {
              console.log(res);
              self.selectedDependingItems = plainToClass(Task, res);
            },
            error =>  console.log(error));
        },
        error =>  console.log(error));
    }

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

    if(this.isEditing) {
      this._backlogItemRESTService.updateBacklogItem(this.backlogItem)
        .subscribe(
          res =>    this.router.navigate(['/']),
          error =>  console.log(error));
    } else {
      this.backlogItemSend(this.backlogItem)
        .subscribe(
          res =>    this.router.navigate(['/']),
          error =>  console.log(error));
    }

    return false;
  }

  deleteBacklogItem(): boolean {
    this._backlogItemRESTService.deleteBacklogItem(this.backlogItem)
      .subscribe(
        res =>    this.router.navigate(['/']),
        error =>  console.log(error));

    return false;
  }

  backlogItemSend(backlogItem: BacklogItem): Observable<any[]> {
    return this.http.post('/api/' + this._backlogItemRESTService.getPath(backlogItem.type), backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  resolveUserIds(ids: Array<string>): Observable<any[]> {
    return this.http.post('/user/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  resolveTaskIds(ids: Array<string>): Observable<any[]> {
    return this.http.post('/task/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this.http.post('/user/getUser', { keyword: text })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
