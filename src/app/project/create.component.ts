import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from '../models/project';
import {User} from '../models/user';
import {plainToClass} from 'class-transformer';
import {UserRESTService} from '../user/userREST.service';
import {Utility} from '../utility/utility';
import {SessionService} from '../auth/session.service';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'create-project-cmp',
  templateUrl: 'create.html'
})
export class CreateProjectComponent implements OnInit {
  project: Project;

  searchedUsers: Array<User>;
  selectedAssignees: Array<User>;
  isEditing: boolean;
  id: string;

  constructor(@Inject(Http) private _http: Http, private _userRESTService: UserRESTService,
              private _sessionService: SessionService, private _route: ActivatedRoute) {
    this.project = new Project();
    this.isEditing = false;

    this.searchedUsers = [];
    this.selectedAssignees = [];

    this.id = this._route.snapshot.params['id'];

    this.id ? this.isEditing = true : this.isEditing = false;
  }

  ngOnInit(): void {
    if (this.isEditing) {
      Project.findById(this._http, this.id).subscribe(
        res => {
          this.project = <Project><any>plainToClass(Project, res);

          this._userRESTService.resolveUserIds(this.project.usersInProject).subscribe(
            res => {
              this.project.usersInProject = res;
              const that = this;
              _.each(this.project.usersInProject, function (user) {
                that.assigneeClicked((<User><any>user));
              });
            },
            error => {
              console.log(error);
            }
          );
        },
        error => console.log(error));
    } else {
      this.assigneeClicked(SessionService.getSignedInUser());
    }
  }

  assigneeClicked(assignee: User): void {
    this.selectedAssignees.push(assignee);
  }

  assigneeRemoved(assignee: User): void {
    this.selectedAssignees.splice(this.selectedAssignees.indexOf(assignee), 1);
  }

  assigneeTyped(text: any): void {
    if (text) {
      this._userRESTService.userSearchSend(text).subscribe(
        res => this.searchedUsers = plainToClass(User, res),
        error => console.log(error));
    } else {
      this.searchedUsers.length = 0;
    }
  }

  saveProject() {
    this.project.usersInProject = Utility.mapToField(this.selectedAssignees, 'id');
    this.project.save(this._http).subscribe(
      res => this._sessionService.updateSignedInUser('/projects'),
      error => console.log(error));
  }

  deleteProject() {
    this.project.deleteEntity(this._http).subscribe(
      res => this._sessionService.updateSignedInUser('/projects'),
      error => console.log(error));
  }
}
