import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import any = jasmine.any;

type StoredUser = {
  username: String,
  authorities: Array<{"authority": string}>
}

@Injectable()
export class SessionService {

  constructor(@Inject(Http) private _http: Http) {
    this.checkSession().subscribe(
        res => {
          if(!res.authenticated) {
            window.location.href='/';
          } else {
            let storedUser: StoredUser = {username: res.principal.username,
                                          authorities: res.principal.authorities};
            sessionStorage.setItem('user', JSON.stringify(storedUser));
          }
        },
        error =>  window.location.href='/');
  }

  checkSession(): Observable<any> {
    return this._http.get('/api/is-signed-in')
      .map((r) => r["_body"] == '' ? {} : r.json());
  }

  getSignedInUser(): StoredUser|undefined {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  isProductOwnerSignedIn(): boolean {
    for(let entry of this.getSignedInUser().authorities) {
      if(entry['authority'] == 'PO') {
        return true;
      }
    }
    return false;
  }

}
