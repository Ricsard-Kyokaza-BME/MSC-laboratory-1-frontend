import {AbstractTask} from './abstractTask';
import {BacklogItemType} from './backlogItemType';
import {BacklogItem} from './backlogItem';
import {plainToClass} from 'class-transformer';
import {CheckItem} from './checkItem';

export class Bug extends AbstractTask {
  static path = 'bug/';

  public static instantiate(object: any): Bug {
    const bug: Bug = plainToClass(Bug, <BacklogItem>object);
    bug.type = BacklogItemType.BUG;
    return bug;
  }

  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string,
              assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any, checkList?: Array<CheckItem>) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.BUG, checkList);
  }

}
