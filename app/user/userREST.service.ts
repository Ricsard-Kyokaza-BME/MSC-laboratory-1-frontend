import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserRESTService {

  constructor(@Inject(Http) private _http: Http) {}

  resolveUserIds(ids: Array<string>): Observable<any[]> {
    return this._http.post('/user/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this._http.post('/user/getUser', { keyword: text })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
