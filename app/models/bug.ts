import {AbstractTask} from "./abstractTask";
import {BacklogItemType} from "./backlogItemType";
import {BacklogItem} from "./backlogItem";
import {plainToClass} from "class-transformer";

export class Bug extends AbstractTask {
  static path: string = 'bug/';

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: any)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.BUG);
  }

  public static instantiate(object: any): Bug {
    var bug: Bug = plainToClass(Bug, <BacklogItem>object);
    bug.type = BacklogItemType.BUG;
    return bug;
  }

}
