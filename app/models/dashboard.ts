import {CRUDEntity} from "./CRUDEntity";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {BacklogItem} from "./backlogItem";

export class Dashboard extends CRUDEntity {
  static path: string = 'dashboard/';

  backlog: Array<BacklogItem>;
  todo: Array<BacklogItem>;
  inProgress: Array<BacklogItem>;
  done: Array<BacklogItem>;

  constructor()
  constructor(id: string, backlog: Array<BacklogItem>, todo: Array<BacklogItem>, inProgress: Array<BacklogItem>, done: Array<BacklogItem>)
  constructor(id?: string, backlog?: Array<BacklogItem>, todo?: Array<BacklogItem>, inProgress?: Array<BacklogItem>, done?: Array<BacklogItem>) {
    super(id);
    this.backlog = backlog || [];
    this.todo = todo  || [];
    this.inProgress = inProgress  || [];
    this.done = done  || [];
  }

  public static addBacklogItem(http: Http, dashboardId: string, backlogItem: BacklogItem) : Observable<any[]> {
    return http.post(CRUDEntity.basePath + Dashboard.path + dashboardId + "/add", backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
