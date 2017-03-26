import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserRESTService {

  constructor(@Inject(Http) private _http: Http) {}

  resolveUserIds(ids: Array<string>): Observable<any[]> {
    return this._http.post('/api/user/find', ids)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  userSearchSend(text: string): Observable<any[]> {
    return this._http.get('/api/user/search/findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase?firstName=' + text + '&lastName=' + text)
      .map((res:Response) => res.json())
      .map((json) => json._embedded.user)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
