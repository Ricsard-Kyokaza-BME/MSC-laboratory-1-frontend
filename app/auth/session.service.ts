import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {plainToClass} from "class-transformer";
import {Router} from "@angular/router";

@Injectable()
export class SessionService {

  constructor(@Inject(Http) private _http: Http, private _router: Router) {
    this.updateSignedInUser();
  }

  updateSignedInUser(redirectUrl?: string) {
    return this._http.get('/api/is-signed-in')
      .map((r) => r["_body"] == '' ? {} : r.json())
      .subscribe(
        res => {
          if(res && res.id) {
            sessionStorage.setItem('user', JSON.stringify(res));
            this._router.navigate([(redirectUrl || this._router.url)]);
          } else {
            SessionService.logout();
          }
        },
        error =>  SessionService.logout());
  }

  getSignedInUserId(): string|undefined {
    return SessionService.getSignedInUser().id;
  }

  static getSignedInUser(): User|undefined {
    return plainToClass(User, <User>JSON.parse(sessionStorage.getItem('user')));
  }

  isProductOwnerSignedIn(): boolean {
    for(let entry of SessionService.getSignedInUser().roles) {
      if(entry['authority'] == 'PO') {
        return true;
      }
    }
    return false;
  }

  static logout() {
    sessionStorage.removeItem('user');
    window.location.href='/logout';
  }

}
