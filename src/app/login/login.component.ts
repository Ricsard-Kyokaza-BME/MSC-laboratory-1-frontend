import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface Login {
  username: string;
  password: string;
}

@Component({
  selector: 'login-cmp',
  templateUrl: 'app/app/login/login.html',
})
export class LoginCmp {
  loginObject: Login;
  x: Number;

  constructor(private http: Http) {
    this.loginObject = {
      username: '',
      password: ''
    };
  }

  public login(): boolean {
    this.loginSend()
      .subscribe(
        res => console.log(res),
        error => console.log(error));

    return false;
  }

  loginSend(): Observable<any[]> {
    const bodyString = JSON.stringify(this.loginObject); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.post('/api/login', bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  public secure(): boolean {
    this.secureSend()
      .subscribe(
        res => console.log(res),
        error => console.log(error));

    return false;
  }

  secureSend(): Observable<any[]> {
    const bodyString = JSON.stringify({}); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.post('/api/secure', bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  public preventDefault(event: Event): void {
    event.preventDefault();
  }

}
