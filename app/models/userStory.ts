import {BacklogItem} from "./backlogItem";
import {BacklogItemType} from "./backlogItemType";
import {plainToClass} from "class-transformer";

export class UserStory extends BacklogItem {
  static path: string = 'userstory/';

  subtasks: Array<string>;
  definitionOfDone: string;
  acceptanceCriteria: string;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: any, subtasks: Array<string>, definitionOfDone: string, acceptanceCriteria: string)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any, subtasks?: Array<string>, definitionOfDone?: string, acceptanceCriteria?: string) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.USER_STORY);
    this.subtasks = subtasks || [];
    this.definitionOfDone = definitionOfDone;
    this.acceptanceCriteria = acceptanceCriteria;
  }

  public static instantiate(object: any): UserStory {
    var userStory: UserStory = plainToClass(UserStory, <BacklogItem>object);
    userStory.type = BacklogItemType.USER_STORY;
    return userStory;
  }

}
