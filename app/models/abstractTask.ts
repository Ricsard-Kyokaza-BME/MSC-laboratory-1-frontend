import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export class AbstractTask extends BacklogItem {

  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<User>, complexity: any, depending: any, status: BacklogStatus) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status);
  }
}
