import {CRUDEntity} from "./CRUDEntity";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {BacklogItem} from "./backlogItem";
import {Sprint} from "./sprint";

export class Dashboard extends CRUDEntity {
  static path: string = 'dashboard/';

  backlog: Array<BacklogItem>;
  todo: Array<BacklogItem>;
  inProgress: Array<BacklogItem>;
  done: Array<BacklogItem>;
  sprint?: Sprint;

  constructor()
  constructor(id: string, backlog: Array<BacklogItem>, todo: Array<BacklogItem>, inProgress: Array<BacklogItem>, done: Array<BacklogItem>, sprint: Sprint)
  constructor(id?: string, backlog?: Array<BacklogItem>, todo?: Array<BacklogItem>, inProgress?: Array<BacklogItem>, done?: Array<BacklogItem>, sprint?: Sprint) {
    super(id);
    this.backlog = backlog || [];
    this.todo = todo  || [];
    this.inProgress = inProgress  || [];
    this.done = done  || [];
    this.sprint = sprint;
  }

  public static addBacklogItem(http: Http, dashboardId: string, backlogItem: BacklogItem) : Observable<any[]> {
    return http.post(CRUDEntity.basePath + Dashboard.path + dashboardId + "/add", backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
