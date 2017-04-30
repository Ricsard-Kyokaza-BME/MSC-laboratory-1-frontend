import {AbstractTask} from './abstractTask';
import {BacklogItemType} from './backlogItemType';
import {BacklogItem} from './backlogItem';
import {plainToClass} from 'class-transformer';
import {CheckItem} from './checkItem';

export class Task extends AbstractTask {
  static path = 'task/';

  progressInfo: any;

  public static instantiate(object: any): Task {
    const task: Task = plainToClass(Task, <BacklogItem>object);
    task.type = BacklogItemType.TASK;
    return task;
  }

  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string,
              assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any,
              progressInfo?: any, checkList?: Array<CheckItem>) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.TASK, checkList);
    this.progressInfo = progressInfo;
  }

}
