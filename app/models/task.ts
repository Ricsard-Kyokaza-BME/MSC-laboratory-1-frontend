import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export class Task extends AbstractTask {
  private _progressInfo: any;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<User>, complexity: any, depending: any, status: BacklogStatus, progressInfo: any)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<User>, complexity?: any, depending?: any, status?: BacklogStatus, progressInfo?: any) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status);
    this._progressInfo = progressInfo;
  }

  get progressInfo(): any {
    return this._progressInfo;
  }

  set progressInfo(value: any) {
    this._progressInfo = value;
  }
}
