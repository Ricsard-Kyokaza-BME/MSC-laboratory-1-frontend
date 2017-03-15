import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";
import {Http} from "@angular/http";
import {Inject} from "@angular/core";

export class Bug extends AbstractTask {
  static path: string = 'bug/';

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.BUG);
  }
}
