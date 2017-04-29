import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SessionService} from "../auth/session.service";
import {BacklogItem} from "../models/backlogItem";
import {BacklogItemType} from "../models/backlogItemType";
import {Dashboard} from "../models/dashboard";
import * as _ from "underscore";
import {BacklogStatus} from "../models/backlogStatus";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard-column-cmp',
  templateUrl: 'app/app/dashboard/column.html'
})
export class DashboardColumnComponent {
  @Input() items: Array<BacklogItem>;
  @Input() dashboard: Dashboard;
  @Input() backlogStatus: BacklogStatus;
  @Input() type: string;
  @Input() title: string;
  @Input() targetZones: Array<string>;
  @Input() dropZone: Array<string>;

  @Output() updateDashboard = new EventEmitter<{ type: string, backlogItem: BacklogItem }>();

  sessionService: SessionService;
  backlogItemType = BacklogItemType;

  orderSwitch: boolean;

  constructor(sessionService: SessionService, private _router: Router) {
    this.sessionService = sessionService;

    this.orderSwitch = false;
  }

  goToCreateBacklogItem() {
    this._router.navigate(['/backlog-item/' + this.dashboard.id + '/create']);
  }

  dashboardItemClicked(item: BacklogItem): void {
    this._router.navigate(['/' + item.getPath() + 'edit/' + this.dashboard.id + '/' + item.id]);
  }

  dropDnDItem($event: { dragData: any, mouseEvent: MouseEvent }, status: BacklogStatus): void {
    let item: BacklogItem = <BacklogItem>$event.dragData;
    item.status = BacklogStatus[status];
    this.dashboard[this.type].push(item);
  }

  removeDnDItem($event: { dragData: any, mouseEvent: MouseEvent }): void {
    let backlogItem: BacklogItem = <BacklogItem>$event.dragData;
    this.removeItem(backlogItem, this.dashboard[this.type]);
    this.updateDashboard.emit({type: 'dnd', backlogItem: backlogItem});
  }

  onSortSuccess($event: { dragData: any, mouseEvent: MouseEvent }): void {
    let backlogItem: BacklogItem = <BacklogItem>$event.dragData;
    this.updateDashboard.emit({type: 'sort', backlogItem: backlogItem});
  }

  private removeItem(item: BacklogItem, array: Array<BacklogItem>): void {
    array.splice(array.indexOf(item), 1);
  }

  isInTheSprint(itemId: string): boolean {
    if (this.dashboard && this.dashboard.sprint) {
      return _.contains(this.dashboard.sprint.backlogItemsInvolved, itemId);
    } else {
      return false;
    }
  }

}
