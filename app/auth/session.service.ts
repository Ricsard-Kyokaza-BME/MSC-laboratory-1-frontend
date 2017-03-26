import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import any = jasmine.any;
import {User} from "../models/user";
import {plainToClass} from "class-transformer";
import {Router} from "@angular/router";

type StoredUser = {
  username: String,
  authorities: Array<{"authority": string}>
}

@Injectable()
export class SessionService {

  constructor(@Inject(Http) private _http: Http, private _router: Router) {
    this.updateSignedInUser();
  }

  updateSignedInUser() {
    return this._http.get('/api/is-signed-in')
      .map((r) => r["_body"] == '' ? {} : r.json())
      .subscribe(
        res => {
          if(res && res.id) {
            sessionStorage.setItem('user', JSON.stringify(res));
            this._router.navigate(['/projects']);
          } else {
            this.logout();
          }
        },
        error =>  this.logout());
  }

  getSignedInUserId(): string|undefined {
    return this.getSignedInUser().id;
  }

  getSignedInUser(): User|undefined {
    return plainToClass(User, <User>JSON.parse(sessionStorage.getItem('user')));
  }

  isProductOwnerSignedIn(): boolean {
    for(let entry of this.getSignedInUser().roles) {
      if(entry['authority'] == 'PO') {
        return true;
      }
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('user');
    window.location.href='/logout';
  }

}
