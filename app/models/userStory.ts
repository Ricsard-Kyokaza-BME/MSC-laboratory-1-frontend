import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {BacklogItemType} from "./backlogItemType";

export class UserStory extends BacklogItem {
  static path: string = 'userstory/';

  subtasks: Array<string>;
  definitionOfDone: string;
  acceptanceCriteria: string;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: BacklogStatus, subtasks: Array<string>, definitionOfDone: string, acceptanceCriteria: string)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: BacklogStatus, subtasks?: Array<string>, definitionOfDone?: string, acceptanceCriteria?: string) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.USER_STORY);
    this.subtasks = subtasks || [];
    this.definitionOfDone = definitionOfDone;
    this.acceptanceCriteria = acceptanceCriteria;
  }

}
