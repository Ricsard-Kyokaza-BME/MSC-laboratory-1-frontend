import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";
import {Complexity} from "./complexity";
import {CRUDEntity} from "./CRUDEntity";

export abstract class BacklogItem extends CRUDEntity {
  title: string;
  createDate: Date;
  keywords: Array<string>;
  description: string;
  assignee: Array<string>;
  complexity: string;
  depending: Array<string>;
  status: BacklogStatus;
  type: BacklogItemType;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus, type: BacklogItemType)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus, type?: BacklogItemType) {
    super(id);
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
