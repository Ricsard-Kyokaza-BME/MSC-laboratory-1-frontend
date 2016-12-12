import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";
import {Complexity} from "./complexity";

export abstract class BacklogItem {
  id: string;
  title: string;
  createDate: Date;
  keywords: Array<string>;
  description: string;
  assignee: Array<string>;
  complexity: number;
  depending: Array<string>;
  status: BacklogStatus;
  type: BacklogItemType;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus, type: BacklogItemType)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus, type?: BacklogItemType) {
    this.id = id;
    this.title = title;
    this.createDate = createDate || new Date();
    this.keywords = keywords || [];
    this.description = description;
    this.assignee = assignee || [];
    this.complexity = complexity || Complexity.ZERO;
    this.depending = depending || [];
    this.status = status || BacklogStatus.BACKLOG;
    this.type = type;
  }

}
