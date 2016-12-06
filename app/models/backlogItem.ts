import {BacklogStatus} from "./backlogStatus";
import {User} from "./user";

export abstract class BacklogItem {
  private _id: string;
  private _title: string;
  private _createDate: Date;
  private _keywords: Array<string>;
  private _description: string;
  private _assignee: Array<User>;
  private _complexity: any;
  private _depending: any;
  private _status: BacklogStatus;

  constructor(id: string, title: string, createDate: Date, keywords: Array<string>, description: string, assignee: Array<User>, complexity: any, depending: any, status: BacklogStatus) {
    this._id = id;
    this._title = title;
    this._createDate = createDate;
    this._keywords = keywords;
    this._description = description;
    this._assignee = assignee;
    this._complexity = complexity;
    this._depending = depending;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  get keywords(): Array<string> {
    return this._keywords;
  }

  set keywords(value: Array<string>) {
    this._keywords = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get assignee(): Array<User> {
    return this._assignee;
  }

  set assignee(value: Array<User>) {
    this._assignee = value;
  }

  get complexity(): any {
    return this._complexity;
  }

  set complexity(value: any) {
    this._complexity = value;
  }

  get depending(): any {
    return this._depending;
  }

  set depending(value: any) {
    this._depending = value;
  }

  get status(): BacklogStatus {
    return this._status;
  }

  set status(value: BacklogStatus) {
    this._status = value;
  }
}
