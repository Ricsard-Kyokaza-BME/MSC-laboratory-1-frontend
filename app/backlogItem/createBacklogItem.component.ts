import {Component} from '@angular/core';
import {BacklogItem} from "../models/backlogItem";
import {BacklogStatus} from "../models/backlogStatus";
import {UserStory} from "../models/userStory";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Bug} from "../models/bug";
// import * as $ from 'jquery';

@Component({
  selector: 'create-backlog-item-cmp',
  templateUrl: 'app/app/backlogItem/create.html'
})
export class CreateBacklogItemComponent {
  backlogItem: BacklogItem;
  tempObject: any;
  typeRadio: string;

  constructor(private http: Http) {
    this.backlogItem = new UserStory();
    this.tempObject = {};
    this.typeRadio = 'userStory';
    // $('.chips').material_chip();
  }

  saveBacklogItem() {
    //TODO DEBUG
    console.log(this.tempObject);
    let tmpItem = new Bug('1', 'Abcd', new Date(), ['a'],
      'Desc', [new User()], '1', null, BacklogStatus.BACKLOG);

    this.backlogItemSend(tmpItem)
      .subscribe(
        res => console.log(res),
        error =>  console.log(error));

    return false;
  }

  backlogItemSend(backlogItem: BacklogItem): Observable<any[]> {
    return this.http.post('/api/bug', backlogItem)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
