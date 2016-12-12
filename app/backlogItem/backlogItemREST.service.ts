import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {BacklogItem} from "../models/backlogItem";
import {BacklogItemType} from "../models/BacklogItemType";

@Injectable()
export class BacklogItemRESTService {

  constructor(@Inject(Http) private _http: Http) {}

  getPath(type: BacklogItemType): string {
    var path: string;
    switch (type.toString()) {
      case '0':
        path = 'userstory';
        break;
      case '1':
        path = 'task';
        break;
      case '2':
        path = 'bug';
        break;
      case 'USER_STORY':
        path = 'userstory';
        break;
      case 'TASK':
        path = 'task';
        break;
      case 'BUG':
        path = 'bug';
        break;
    }
    return path;
  }

  getBacklogItem(id: string, type: string): Observable<any[]> {
    return this._http.get('/api/' + type + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBacklogItems(): Observable<any[]> {
    return this._http.get('/api/backlog-item')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBacklogItemsByStatus(): Observable<any[]> {
    return this._http.get('/api/backlog-item/by-status')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateBacklogItem(backlogItem: BacklogItem): Observable<any[]> {
    return this._http.put('/api/' + this.getPath(backlogItem.type) + '/' + backlogItem.id, backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteBacklogItem(backlogItem: BacklogItem): Observable<any[]> {
    return this._http.delete('/api/' + this.getPath(backlogItem.type) + '/' + backlogItem.id, backlogItem)
      .map((res:Response) => res.text())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
