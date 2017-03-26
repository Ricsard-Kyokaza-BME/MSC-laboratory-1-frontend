import {Component, Inject, OnInit} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {User} from "../models/user";
import {Bug} from "../models/bug";
import {Complexity} from "../models/complexity";
import {plainToClass} from "class-transformer";
import {Task} from "../models/task";
import {BacklogItemRESTService} from "./backlogItemREST.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserRESTService} from "../user/userREST.service";
import {Http} from "@angular/http";
import {CRUDEntity} from "../models/CRUDEntity";
import {SessionService} from "../auth/session.service";
import {Utility} from "../utility/utility";

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
  selectedSubTaskItems: Array<BacklogItem>;

  complexity = Complexity;
  backlogStatus = BacklogStatus;
  sessionService: SessionService;

  constructor(@Inject(Http) private _http: Http, private _backlogItemRESTService: BacklogItemRESTService, private _route: ActivatedRoute,
              private _router: Router, private _userRESTService: UserRESTService, sessionService: SessionService) {
    this.searchedUsers = [];
    this.selectedAssignees = [];
    this.backlogItems = new Map<string, Array<BacklogItem>>();
    this.selectedDependingItems = [];
    this.selectedSubTaskItems = [];
    this.sessionService = sessionService;

    if(sessionService.isProductOwnerSignedIn()) {
      this.backlogItem = new UserStory();
      this.typeRadio = 'userStory';
    } else {
      this.backlogItem = new Task();
      this.typeRadio = 'task';
    }

    this.id = this._route.snapshot.params['id'];
    this.type = this._route.snapshot.params['type'];

    (this.id && this.type) ? this.isEditing = true : this.isEditing = false;

    $(document).ready(function() {
      $('select').material_select();
    });
  }

  ngOnInit(): void {
    if(this.isEditing) {
      CRUDEntity.findById(this._http, this.id, this.type).subscribe(
        res => {
          this.instantiateBacklogItem(res);

          this.keywords = { data: [] };
          for(let i = 0; i < this.backlogItem.keywords.length; i++) {
            this.keywords.data.push({ tag: this.backlogItem.keywords[i] });
          }

          this._userRESTService.resolveUserIds(this.backlogItem.assignee).subscribe(
            res =>    this.selectedAssignees = plainToClass(User, res),
            error =>  console.log(error));

          this._backlogItemRESTService.resolveTaskIds(this.backlogItem.depending).subscribe(
            res =>    this.selectedDependingItems = plainToClass(Task, res),
            error =>  console.log(error));

          if(this.type == 'userstory') {
            this._backlogItemRESTService.resolveTaskIds((<UserStory>this.backlogItem).subtasks).subscribe(
              res =>    this.selectedSubTaskItems = plainToClass(Task, res),
              error =>  console.log(error));
          }
        },
        error =>  console.log(error));
    }

    this._backlogItemRESTService.getBacklogItems().subscribe(
      res => {
        this.backlogItems.set('userStory', plainToClass(UserStory, res['userStory']));
        this.backlogItems.set('task', plainToClass(Task, res['task']));
        this.backlogItems.set('bug', plainToClass(Bug, res['bug']));
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
      this._userRESTService.userSearchSend(text).subscribe(
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

  addSubTaskItem(item: BacklogItem): void {
    this.selectedSubTaskItems.push(item);
  }

  subTaskItemRemoved(item: BacklogItem): void {
    this.selectedSubTaskItems.splice(this.selectedSubTaskItems.indexOf(item), 1);
  }

  saveBacklogItem(): boolean {
    this.backlogItem.assignee = Utility.mapToField(this.selectedAssignees, 'id');
    this.backlogItem.depending = Utility.mapToField(this.selectedDependingItems, 'id');
    if(this.typeRadio == 'userStory') {
      (<UserStory>this.backlogItem).subtasks = Utility.mapToField(this.selectedSubTaskItems, 'id');
    }

    // if(this.isEditing) {
    //   this._backlogItemRESTService.updateBacklogItem(this.backlogItem).subscribe(
    //     res =>    this._router.navigate(['/']),
    //     error =>  console.log(error));
    // } else {
    //   this._backlogItemRESTService.backlogItemSave(this.backlogItem).subscribe(
    //     res =>    this._router.navigate(['/']),
    //     error =>  console.log(error));
    // }

    this.backlogItem.save(this._http).subscribe(
      res =>    this._router.navigate(['/projects']),
      error =>  console.log(error));

    return false;
  }

  deleteBacklogItem(): boolean {
    this.backlogItem.deleteEntity(this._http).subscribe(
      res =>    this._router.navigate(['/projects']),
      error =>  console.log(error));

    return false;
  }

  instantiateBacklogItem(res: Array<any>): void {
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
}
