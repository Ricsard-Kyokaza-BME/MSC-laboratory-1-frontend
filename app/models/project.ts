import {CRUDEntity} from "./CRUDEntity";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

export class Project extends CRUDEntity {
  static path: string = 'project/';

  name: string;
  description: string;
  usersInProject: Array<string>;
  dashboardId: string;

  constructor()
  constructor(id: string, name: string, description: string, usersInProject: Array<string>, dashboardId: string)
  constructor(id?: string, name?: string, description?: string, usersInProject?: Array<string>, dashboardId?: string) {
    super(id);
    this.name = name;
    this.description = description;
    this.usersInProject = usersInProject;
    this.dashboardId = dashboardId;
  }

  getDashboard(http: Http) : Observable<any[]> {
    return http.get(CRUDEntity.basePath + Project.path + this.id + "/dashboard")
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
