import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";

export class Bug extends AbstractTask {
  static path: string = 'bug/';

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: any)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.BUG);
  }
}
