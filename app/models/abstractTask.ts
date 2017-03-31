import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";

export abstract class AbstractTask extends BacklogItem {

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus, type: BacklogItemType)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus, type?: BacklogItemType) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, type);
  }
}
