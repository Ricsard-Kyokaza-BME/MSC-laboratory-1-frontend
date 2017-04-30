import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Sprint} from '../models/sprint';
import {ActivatedRoute, Router} from '@angular/router';
import {BacklogItem} from '../models/backlogItem';
import {Dashboard} from '../models/dashboard';
import {plainToClass} from 'class-transformer';
import {Bug} from '../models/bug';
import {BacklogItemType} from '../models/backlogItemType';
import {Task} from '../models/task';
import {UserStory} from '../models/userStory';
import {Project} from '../models/project';
import * as _ from 'underscore';

@Component({
  selector: 'sprint-create-cmp',
  templateUrl: 'create.html'
})
export class CreateSprintComponent implements OnInit {
  backlogItems: Array<BacklogItem>;
  backlogItemType = BacklogItemType;

  sprint: Sprint;
  dashboard: Dashboard;
  project: Project;

  constructor(@Inject(Http) private _http: Http, private _router: Router, private _route: ActivatedRoute) {
    this.sprint = new Sprint();
    this.project = new Project();
    this.dashboard = new Dashboard();

    this.backlogItems = [];

    this.project.id = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.project.getDashboard(this._http).subscribe(
      res => {
        this.dashboard = plainToClass(Dashboard, <Dashboard><any>res);

        this.dashboard.backlog = this.mapDashboardItems(this.dashboard.backlog);
        this.dashboard.todo = this.mapDashboardItems(this.dashboard.todo);
        this.dashboard.inProgress = this.mapDashboardItems(this.dashboard.inProgress);

        this.backlogItems.push.apply(this.backlogItems, this.dashboard.backlog);
        this.backlogItems.push.apply(this.backlogItems, this.dashboard.todo);
        this.backlogItems.push.apply(this.backlogItems, this.dashboard.inProgress);
      },
      error => console.log(error));
  }

  mapDashboardItems(res: any[]): Array<BacklogItem> {
    const that = this;
    const instantiatedItems: Array<BacklogItem> = [];

    res.forEach(function (element) {
      instantiatedItems.push(that.instantiateBacklogItem(element));
    });

    return instantiatedItems;
  }

  instantiateBacklogItem(res: any): BacklogItem {
    switch (res.type) {
      case BacklogItemType[BacklogItemType.USER_STORY]:
        return UserStory.instantiate(res);
      case BacklogItemType[BacklogItemType.TASK]:
        return Task.instantiate(res);
      case BacklogItemType[BacklogItemType.BUG]:
        return Bug.instantiate(res);
    }
  }

  addToBacklogItem($event: { dragData: any, mouseEvent: MouseEvent }) {
    const item: BacklogItem = <BacklogItem>$event.dragData;
    this.backlogItems.push(item);
  }

  addToSelectedBacklogItem($event: { dragData: any, mouseEvent: MouseEvent }) {
    const item: BacklogItem = <BacklogItem>$event.dragData;
    this.sprint.backlogItemsInvolved.push(item);
  }

  removeFromBacklogItem($event: { dragData: any, mouseEvent: MouseEvent }) {
    const item: BacklogItem = <BacklogItem>$event.dragData;
    this.backlogItems.splice(this.backlogItems.indexOf(item), 1);
  }

  removeFromSelectedBacklogItem($event: { dragData: any, mouseEvent: MouseEvent }) {
    const item: BacklogItem = <BacklogItem>$event.dragData;
    this.sprint.backlogItemsInvolved.splice(this.sprint.backlogItemsInvolved.indexOf(item), 1);
  }

  saveSprint() {
    const tmpSprint: Sprint = jQuery.extend(true, {}, this.sprint);
    tmpSprint.backlogItemsInvolved = _.map(tmpSprint.backlogItemsInvolved, function (element: BacklogItem) {
      return element.id;
    });

    tmpSprint.saveSprint(this._http, this.project.id).subscribe(
      res => this._router.navigate(['/projects']),
      error => console.log(error));
  }

}
