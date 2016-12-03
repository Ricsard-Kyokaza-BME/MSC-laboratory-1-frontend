import {
  Inject,
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers
} from '@angular/http';

import 'rxjs/add/operator/map';
import Any = jasmine.Any;

type StoredUser = {
  username: String,
  authorities: Array<String>
}

@Injectable()
export class SessionService {
  static ENDPOINT: string = '/api/is-signed-in';

  constructor(@Inject(Http) private _http: Http) {
    this.checkSession()
      .subscribe(
        res => {
          // console.log(res);
          if(!res.authenticated) {
            window.location.href='/'
          } else {
            let storedUser: StoredUser = {username: res.principal.username,
                                          authorities: res.principal.authorities};
            sessionStorage.setItem('user', JSON.stringify(storedUser));
          }
        },
        error =>  console.log(error));
  }

  checkSession():Observable<any> {
    return this._http
      .get(SessionService.ENDPOINT)
      .map((r) => r["_body"] == '' ? {} : r.json());
  }

  getSignedInUser():StoredUser|undefined {
    return JSON.parse(sessionStorage.getItem('user'));
  }

}
