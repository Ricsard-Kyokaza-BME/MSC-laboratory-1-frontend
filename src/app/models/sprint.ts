import {CRUDEntity} from './CRUDEntity';
import * as moment from 'moment';
import {BacklogItem} from './backlogItem';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class Sprint extends CRUDEntity {
  static path = 'sprint/';

  startTime: string;
  endTime: string;
  backlogItemsInvolved: Array<BacklogItem | string>;

  constructor(id?: string, startTime?: string, endTime?: string, backlogItemsInvolved?: Array<BacklogItem>) {
    super(id);
    this.startTime = moment(startTime).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
    this.endTime = moment(endTime).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
    this.backlogItemsInvolved = backlogItemsInvolved || [];
  }


  public saveSprint(http: Http, projectId: string): Observable<any[]> {
    return http.post(CRUDEntity.basePath + 'project/' + projectId + '/sprint', this)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
