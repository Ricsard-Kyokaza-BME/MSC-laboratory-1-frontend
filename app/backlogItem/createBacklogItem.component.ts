import {Component} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent {
  backlogItem: BacklogItem;

  constructor() {
    this.backlogItem = new UserStory();
  }
}
