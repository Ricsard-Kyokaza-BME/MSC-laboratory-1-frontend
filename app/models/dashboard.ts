import {CRUDEntity} from "./CRUDEntity";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {BacklogItem} from "./backlogItem";

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

  public static addBacklogItem(http: Http, id: string, backlogItem: BacklogItem) : Observable<any[]> {
    return http.post(CRUDEntity.basePath + Dashboard.path + id, backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
