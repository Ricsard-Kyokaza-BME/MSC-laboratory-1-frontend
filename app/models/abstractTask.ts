import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";
import {BacklogItemType} from "./BacklogItemType";

export class AbstractTask extends BacklogItem {

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: any, status: BacklogStatus, type: BacklogItemType)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: any, status?: BacklogStatus, type?: BacklogItemType) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, type);
  }
}
