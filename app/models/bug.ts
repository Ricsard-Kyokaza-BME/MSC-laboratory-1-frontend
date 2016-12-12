import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";
import {BacklogItemType} from "./BacklogItemType";

export class Bug extends AbstractTask {

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: any, status: BacklogStatus)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: any, status?: BacklogStatus) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.BUG);
  }
}
