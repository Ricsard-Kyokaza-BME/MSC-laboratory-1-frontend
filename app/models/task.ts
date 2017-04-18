import {AbstractTask} from "./abstractTask";
import {BacklogItemType} from "./backlogItemType";
import {BacklogItem} from "./backlogItem";
import {plainToClass} from "class-transformer";

export class Task extends AbstractTask {
  static path: string = 'task/';

  progressInfo: any;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: any, progressInfo: any)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any, progressInfo?: any) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.TASK);
    this.progressInfo = progressInfo;
  }

  public static instantiate(object: any): Task {
    var task: Task = plainToClass(Task, <BacklogItem>object);
    task.type = BacklogItemType.TASK;
    return task;
  }

}
