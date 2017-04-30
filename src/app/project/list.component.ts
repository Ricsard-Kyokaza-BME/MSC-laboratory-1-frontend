import {Component, Inject, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {SessionService} from '../auth/session.service';
import {Project} from '../models/project';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'project-list-cmp',
  templateUrl: 'list.html'
})
export class ProjectListComponent implements OnInit {
  projects: Array<Project>;

  constructor(@Inject(Http) private _http: Http) {
    this.projects = [];
  }

  ngOnInit(): void {
    SessionService.getSignedInUser().getProjects(this._http).subscribe(
      res =>    this.projects = plainToClass(Project, res),
      error =>  console.log(error));
  }
}
