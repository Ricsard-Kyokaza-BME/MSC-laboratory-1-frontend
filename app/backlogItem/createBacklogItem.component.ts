import {Component, OnInit} from '@angular/core';
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
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent implements OnInit {
  id: string;
  isEditing: boolean;
  type: string;
  typeRadio: string;
  keywords: any;
  assigneeSearch: string;
  backlogItem: BacklogItem;
  backlogItems: Map<string, Array<BacklogItem>>;
  searchedUsers: Array<User>;
  selectedAssignees: Array<User>;
  selectedDependingItems: Array<BacklogItem>;

  complexity = Complexity;
  backlogStatus = BacklogStatus;

  constructor(private _http: Http, private _backlogItemRESTService: BacklogItemRESTService,
              private _route: ActivatedRoute, private _router: Router) {
    this.isEditing = false;
    this.searchedUsers = [];
    this.selectedAssignees = [];
    this.backlogItems = new Map<string, Array<BacklogItem>>();
    this.selectedDependingItems = [];

    this.backlogItem = new UserStory();
    this.typeRadio = 'userStory';

    this.id = this._route.snapshot.params['id'];
    this.type = this._route.snapshot.params['type'];
    if(this.id && this.type) {
      this.isEditing = true;
    }
  }

  ngOnInit(): void {
    if(this.isEditing) {
      this._backlogItemRESTService.getBacklogItem(this.id, this.type).subscribe(
        res => {
          this.instantiateBacklogItem(res);

          this.keywords = { data: [] };
          for(let i = 0; i < this.backlogItem.keywords.length; i++) {
            this.keywords.data.push({ tag: this.backlogItem.keywords[i] });
          }

          this.resolveUserIds(this.backlogItem.assignee).subscribe(
            res =>    this.selectedAssignees = plainToClass(User, res),
            error =>  console.log(error));

          this.resolveTaskIds(this.backlogItem.depending).subscribe(
            res =>    this.selectedDependingItems = plainToClass(Task, res),
            error =>  console.log(error));
        },
        error =>  console.log(error));
    }

    this._backlogItemRESTService.getBacklogItems()
      .subscribe(
        res => {
          this.backlogItems.set('userStory', plainToClass(UserStory, res['userStory']));
          this.backlogItems.set('task', plainToClass(UserStory, res['task']));
          this.backlogItems.set('bug', plainToClass(UserStory, res['bug']));
        },
        error =>  console.log(error));
  }

  radioButtonClicked(type: string): void {
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

  addKeyword(chip: any): void {
    !this.backlogItem.keywords ? this.backlogItem.keywords = [] : '';
    this.backlogItem.keywords.push(chip.tag);
  }

  deleteKeyword(chip: any): void {
    this.backlogItem.keywords.splice(this.backlogItem.keywords.indexOf(chip.tag), 1);
  }

  assigneeClicked(assignee: User): void {
    this.selectedAssignees.push(assignee);
  }

  assigneeRemoved(assignee: User): void {
    this.selectedAssignees.splice(this.selectedAssignees.indexOf(assignee), 1);
  }

  assigneeTyped(text: any): void {
    if(text) {
      this.userSearchSend(text)
        .subscribe(
          res =>    this.searchedUsers = plainToClass(User, res),
          error =>  console.log(error));
    } else {
      this.searchedUsers.length = 0;
    }
  }

  addDependingItem(item: BacklogItem): void {
    this.selectedDependingItems.push(item);
  }

  dependingItemRemoved(item: BacklogItem): void {
    this.selectedDependingItems.splice(this.selectedDependingItems.indexOf(item), 1);
  }

  saveBacklogItem(): boolean {
    let mappedUserIds: Array<string> = [];
    for(let i = 0; i < this.selectedAssignees.length; i++) {
      mappedUserIds.push(this.selectedAssignees[i].id);
    }
    let mappedItemIds: Array<string> = [];
    for(let i = 0; i < this.selectedDependingItems.length; i++) {
      mappedItemIds.push(this.selectedDependingItems[i].id);
    }

    this.backlogItem.assignee = mappedUserIds;
    this.backlogItem.depending = mappedItemIds;

    if(this.isEditing) {
      this._backlogItemRESTService.updateBacklogItem(this.backlogItem)
        .subscribe(
          res =>    this._router.navigate(['/']),
          error =>  console.log(error));
    } else {
      this.backlogItemSend(this.backlogItem)
        .subscribe(
          res =>    this._router.navigate(['/']),
          error =>  console.log(error));
    }

    return false;
  }

  deleteBacklogItem(): boolean {
    this._backlogItemRESTService.deleteBacklogItem(this.backlogItem)
      .subscribe(
        res =>    this._router.navigate(['/']),
        error =>  console.log(error));

    return false;
  }

  instantiateBacklogItem(res: any[]): void {
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
  }

  backlogItemSend(backlogItem: BacklogItem): Observable<any[]> {
    return this._http.post('/api/' + this._backlogItemRESTService.getPath(backlogItem.type), backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  resolveUserIds(ids: Array<string>): Observable<any[]> {
    return this._http.post('/user/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  resolveTaskIds(ids: Array<string>): Observable<any[]> {
    return this._http.post('/task/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this._http.post('/user/getUser', { keyword: text })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
