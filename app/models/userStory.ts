import {BacklogItem} from "./backlogItem";
import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export class UserStory extends BacklogItem {
  private _subtasks: Array<any>;
  private _definitionOfDone: string;
  private _acceptanceCriteria: string;

  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<User>, complexity: any, depending: any, status: BacklogStatus, subtasks: Array<any>, definitionOfDone: string, acceptanceCriteria: string) {
    super(id, title, createDate, keywords, description, assignee, complexity, depending, status);
    this._subtasks = subtasks;
    this._definitionOfDone = definitionOfDone;
    this._acceptanceCriteria = acceptanceCriteria;
  }

  get subtasks(): Array<any> {
    return this._subtasks;
  }

  set subtasks(value: Array<any>) {
    this._subtasks = value;
  }

  get definitionOfDone(): string {
    return this._definitionOfDone;
  }

  set definitionOfDone(value: string) {
    this._definitionOfDone = value;
  }

  get acceptanceCriteria(): string {
    return this._acceptanceCriteria;
  }

  set acceptanceCriteria(value: string) {
    this._acceptanceCriteria = value;
  }
}
