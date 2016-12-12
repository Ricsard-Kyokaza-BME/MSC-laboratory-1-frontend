import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

type StoredUser = {
  username: String,
  authorities: Array<String>
}

@Injectable()
export class SessionService {

  constructor(@Inject(Http) private _http: Http) {
    this.checkSession().subscribe(
        res => {
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

  checkSession(): Observable<any> {
    return this._http.get('/api/is-signed-in')
      .map((r) => r["_body"] == '' ? {} : r.json());
  }

  getSignedInUser(): StoredUser|undefined {
    return JSON.parse(sessionStorage.getItem('user'));
  }

}
