import {
  Inject,
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers, Response
} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BacklogItemRESTService {

  constructor(@Inject(Http) private _http: Http) {

  }

  getBacklogItems(): Observable<any[]> {
    return this._http.get('/api/backlog-item')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
