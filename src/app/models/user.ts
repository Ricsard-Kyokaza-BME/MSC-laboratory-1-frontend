import {Role} from './role';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _roles: Array<Role>;
  private _projects: Array<string>;

  constructor(id?: string, firstName?: string, lastName?: string, email?: string, roles?: Array<Role>, projects?: Array<string>) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._roles = roles;
    this._projects = projects;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): Array<Role> {
    return this._roles;
  }

  set roles(value: Array<Role>) {
    this._roles = value;
  }

  get projects(): Array<string> {
    return this._projects;
  }

  set projects(value: Array<string>) {
    this._projects = value;
  }

  getProjects(http: Http): Observable<any[]> {
    return http.post('/api/project/find', this._projects)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
