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
import {Dashboard} from "../models/dashboard";
import {CheckItem} from "../models/checkItem";
import * as _ from "underscore"

type Step = {
  name: string,
  isActive: boolean
}

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent implements OnInit {
  complexity = Complexity;
  backlogStatus = BacklogStatus;
  sessionService: SessionService;
  backlogItem: BacklogItem;

  id: string;
  dashboardId: string;

  isEditing: boolean;
  type: string;
  backlogItems: Map<string, Array<BacklogItem>>;

  typeRadio: string;
  assigneeSearch: string;
  searchedUsers: Array<User>;
  selectedAssignees: Array<User>;
  selectedDependingItems: Array<BacklogItem>;
  selectedSubTaskItems: Array<BacklogItem>;
  definitionOfDoneItems: Array<string>;
  acceptanceCriteriaItems: Array<string>;
  checkList: Array<string>;

  steps = Array<Step>();

  constructor(@Inject(Http) private _http: Http, private _backlogItemRESTService: BacklogItemRESTService, private _route: ActivatedRoute,
              private _router: Router, private _userRESTService: UserRESTService, sessionService: SessionService) {
    this.sessionService = sessionService;

    this.searchedUsers = [];
    this.selectedAssignees = [];
    this.backlogItems = new Map<string, Array<BacklogItem>>();
    this.selectedDependingItems = [];
    this.selectedSubTaskItems = [];
    this.steps = [];
    this.definitionOfDoneItems = [];
    this.acceptanceCriteriaItems = [];
    this.checkList = [];

    if(sessionService.isProductOwnerSignedIn()) {
      this.backlogItem = new UserStory();
      this.typeRadio = 'userStory';
      this.initSteps('userStory');
    } else {
      this.backlogItem = new Task();
      this.typeRadio = 'task';
      this.initSteps('task');
    }

    this.id = this._route.snapshot.params['id'];
    this.dashboardId = this._route.snapshot.params['dashboardId'];
    this.type = this._route.snapshot.params['type'];

    (this.id && this.type) ? this.isEditing = true : this.isEditing = false;
  }

  ngOnInit(): void {
    if(this.isEditing) {
      CRUDEntity.findById(this._http, this.id, this.type).subscribe(
        res => {
          this.instantiateBacklogItem(res);

          this.checkList = this.mapCheckItemsToKeywords(this.backlogItem.checkList);

          this._userRESTService.resolveUserIds(this.backlogItem.assignee).subscribe(
            res =>    this.selectedAssignees = plainToClass(User, res),
            error =>  console.log(error));

          this._backlogItemRESTService.resolveTaskIds(this.backlogItem.depending).subscribe(
            res =>    this.selectedDependingItems = plainToClass(Task, res),
            error =>  console.log(error));

          if(this.type == 'userstory') {
            this.definitionOfDoneItems = this.mapCheckItemsToKeywords((<UserStory>this.backlogItem).definitionOfDone);
            this.acceptanceCriteriaItems = this.mapCheckItemsToKeywords((<UserStory>this.backlogItem).acceptanceCriteria);

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

  initSteps(backlogItemType) {
    this.steps.length = 0;

    switch (backlogItemType) {
      case 'userStory':
        this.steps.push({name: 'General info', isActive: true});
        this.steps.push({name: 'Details', isActive: false});
        this.steps.push({name: 'Acceptance', isActive: false});
        break;
      default:
        this.steps.push({name: 'General info', isActive: true});
        this.steps.push({name: 'Details', isActive: false});
        break;
    }
  }

  nextStep() {
    for(let i = 0; i < this.steps.length; i++) {
      if(this.steps[i].isActive && i+1 < this.steps.length) {
        this.steps[i].isActive = false;
        this.steps[i + 1].isActive = true;
        break;
      }
    }
  }

  previousStep() {
    for(let i = 0; i < this.steps.length; i++) {
      if(this.steps[i].isActive && i-1 >= 0) {
        this.steps[i].isActive = false;
        this.steps[i - 1].isActive = true;
        break;
      }
    }
  }

  radioButtonClicked(type: string): void {
    switch (type) {
      case 'userStory':
        this.backlogItem = new UserStory();
        this.initSteps('userStory');
        break;
      case 'task':
        this.backlogItem = new Task();
        this.initSteps('task');
        break;
      case 'bug':
        this.backlogItem = new Bug();
        this.initSteps('bug');
        break;
    }
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
    this.backlogItem.checkList = this.mapKeywordsToCheckItem(this.checkList);


    if(this.typeRadio == 'userStory') {
      (<UserStory>this.backlogItem).subtasks = Utility.mapToField(this.selectedSubTaskItems, 'id');
      (<UserStory>this.backlogItem).definitionOfDone = this.mapKeywordsToCheckItem(this.definitionOfDoneItems);
      (<UserStory>this.backlogItem).acceptanceCriteria = this.mapKeywordsToCheckItem(this.acceptanceCriteriaItems);
    }

    Dashboard.addBacklogItem(this._http, this.dashboardId, this.backlogItem).subscribe(
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

  private mapKeywordsToCheckItem(definitionOfDoneItems: any): Array<CheckItem> {
    return _.map(definitionOfDoneItems, function (item) {
      return new CheckItem(false, item.toString());
    });
  }

  private mapCheckItemsToKeywords(acceptanceCriteria: Array<CheckItem>): Array<string> {
    return _.map(acceptanceCriteria, function (item: CheckItem) {
      return item.content;
    });
  }

  instantiateBacklogItem(res: Array<any>): void {
    switch (this.type) {
      case 'userstory':
        this.backlogItem = UserStory.instantiate(res);
        break;
      case 'task':
        this.backlogItem = Task.instantiate(res);
        break;
      case 'bug':
        this.backlogItem = Bug.instantiate(res);
        break;
    }
  }
}
