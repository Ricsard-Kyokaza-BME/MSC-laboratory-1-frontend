import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";
import {BacklogItemType} from "./BacklogItemType";

export class UserStory extends BacklogItem {
  subtasks: Array<any>;
  definitionOfDone: string;
  acceptanceCriteria: string;

  constructor()
  constructor(id: string, title: string) //TODO DEBUG
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: any, status: BacklogStatus, subtasks: Array<any>, definitionOfDone: string, acceptanceCriteria: string)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: any, status?: BacklogStatus, subtasks?: Array<any>, definitionOfDone?: string, acceptanceCriteria?: string) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.USER_STORY);
    this.subtasks = subtasks || [];
    this.definitionOfDone = definitionOfDone;
    this.acceptanceCriteria = acceptanceCriteria;
  }

}
