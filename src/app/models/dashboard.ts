import {CRUDEntity} from './CRUDEntity';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {BacklogItem} from './backlogItem';
import {Sprint} from './sprint';

export class Dashboard extends CRUDEntity {
  static path = 'dashboard/';

  backlog: Array<BacklogItem>;
  todo: Array<BacklogItem>;
  inProgress: Array<BacklogItem>;
  done: Array<BacklogItem>;
  sprint?: Sprint;

  public static addBacklogItem(http: Http, dashboardId: string, backlogItem: BacklogItem): Observable<any[]> {
    return http.post(CRUDEntity.basePath + Dashboard.path + dashboardId + '/add', backlogItem)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  constructor(id?: string, backlog?: Array<BacklogItem>, todo?: Array<BacklogItem>, inProgress?: Array<BacklogItem>,
              done?: Array<BacklogItem>, sprint?: Sprint) {
    super(id);
    this.backlog = backlog || [];
    this.todo = todo || [];
    this.inProgress = inProgress || [];
    this.done = done || [];
    this.sprint = sprint;
  }


  public updateAfterDragnDrop(http: Http, backlogItem: BacklogItem): Observable<any[]> {
    const dashboardWrapper: { dashboard: Dashboard, backlogItem: string } = {
      dashboard: this,
      backlogItem: JSON.stringify(backlogItem)
    };

    return http.post(CRUDEntity.basePath + Dashboard.path + this.id + '/dnd', dashboardWrapper)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
