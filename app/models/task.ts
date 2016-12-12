import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";

export class Task extends AbstractTask {
  progressInfo: any;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus, progressInfo: any)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus, progressInfo?: any) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.TASK);
    this.progressInfo = progressInfo;
  }

}
