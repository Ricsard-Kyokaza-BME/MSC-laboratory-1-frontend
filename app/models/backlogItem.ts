import {BacklogStatus} from "./backlogStatus";

export class BacklogItem {
  id: string;
  name: string;
  status: BacklogStatus;

  constructor(id: string, name: string, status: BacklogStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
