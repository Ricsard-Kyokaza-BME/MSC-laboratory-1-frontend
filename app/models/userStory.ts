import {BacklogItem} from "./backlogItem";
import {BacklogItemType} from "./backlogItemType";
import {plainToClass} from "class-transformer";
import {CheckItem} from "./checkItem";

export class UserStory extends BacklogItem {
  static path: string = 'userstory/';

  subtasks: Array<string>;
  definitionOfDone: Array<CheckItem>;
  acceptanceCriteria: Array<CheckItem>;

  constructor()
  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<string>, complexity: any, depending: Array<string>, status: any, subtasks: Array<string>, definitionOfDone: Array<CheckItem>, acceptanceCriteria: Array<CheckItem>, checkList: Array<CheckItem>)
  constructor(id?: string, title?: string, createDate?: Date, keywords?: Array<string>, description?: string, assignee?: Array<string>, complexity?: any, depending?: Array<string>, status?: any, subtasks?: Array<string>, definitionOfDone?: Array<CheckItem>, acceptanceCriteria?: Array<CheckItem>, checkList?: Array<CheckItem>) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status, BacklogItemType.USER_STORY, checkList);
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
