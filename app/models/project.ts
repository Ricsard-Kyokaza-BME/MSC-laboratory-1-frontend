import {CRUDEntity} from "./CRUDEntity";

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
}
