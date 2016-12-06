import {AbstractTask} from "./abstractTask";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export class Bug extends AbstractTask {

  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<User>, complexity: any, depending: any, status: BacklogStatus) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status);
  }
}
