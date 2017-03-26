import {CRUDEntity} from "./CRUDEntity";

export class Dashboard extends CRUDEntity {
  static path: string = 'dashboard/';

  backlog: Map<Number, string>;
  todo: Map<Number, string>;
  inProgress: Map<Number, string>;
  done: Map<Number, string>;

  constructor()
  constructor(id: string, backlog: Map<Number, string>, todo: Map<Number, string>, inProgress: Map<Number, string>, done: Map<Number, string>)
  constructor(id?: string, backlog?: Map<Number, string>, todo?: Map<Number, string>, inProgress?: Map<Number, string>, done?: Map<Number, string>) {
    super(id);
    this.backlog = backlog;
    this.todo = todo;
    this.inProgress = inProgress;
    this.done = done;
  }

}
