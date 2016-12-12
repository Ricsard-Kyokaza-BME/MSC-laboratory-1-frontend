import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export abstract class BacklogItem {
  id: string;
  title: string;
  createDate: Date;
  keywords: Array<string>;
  description: string;
  assignee: Array<string>;
  complexity: number;
  depending: any;
  status: BacklogStatus;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: any, status: BacklogStatus)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: any, status?: BacklogStatus) {
    this.id = id;
    this.title = title;
    this.createDate = createDate || new Date();
    this.keywords = keywords || [];
    this.description = description;
    this.assignee = assignee || [];
    this.complexity = complexity;
    this.depending = depending || [];
    this.status = status;
  }

}
