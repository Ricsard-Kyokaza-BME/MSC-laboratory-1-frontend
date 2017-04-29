import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SessionService} from "../auth/session.service";
import {BacklogItem} from "../models/backlogItem";
import {BacklogItemType} from "../models/backlogItemType";
import {Dashboard} from "../models/dashboard";
import {BacklogStatus} from "../models/backlogStatus";
import {Router} from "@angular/router";
import * as _ from "underscore";
import {Utility} from "../utility/utility";

type BacklogItemHelper = {
  isOpen: boolean,
}

@Component({
  selector: 'dashboard-column-cmp',
  templateUrl: 'app/app/dashboard/column.html',
  animations: [Utility.fadeInOutAnimation]
})
export class DashboardColumnComponent implements OnInit {
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
  backlogItemHelpers: Map<string, BacklogItemHelper>;

  constructor(sessionService: SessionService, private _router: Router) {
    this.sessionService = sessionService;

    this.orderSwitch = false;
    this.backlogItemHelpers = new Map<string, BacklogItemHelper>();
  }

  ngOnInit(): void {
    let that = this;
    _.each(this.items, function (item: BacklogItem) {
      that.backlogItemHelpers.set(item.id, {isOpen: false});
    });
  }

  toggleItemCheckList(item: BacklogItem) {
    this.backlogItemHelpers.get(item.id).isOpen = !this.backlogItemHelpers.get(item.id).isOpen;
  }

  isItemOpened(item: BacklogItem) {
    let helper: BacklogItemHelper = this.backlogItemHelpers.get(item.id);
    return helper ? helper.isOpen : false;
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
    let item: BacklogItem = <BacklogItem>$event.dragData;
    this.removeItem(item, this.dashboard[this.type]);
    this.updateDashboard.emit({type: 'dnd', backlogItem: item});
  }

  onSortSuccess($event: any): void {
    let item: BacklogItem = <BacklogItem>$event;
    this.updateDashboard.emit({type: 'sort', backlogItem: item});
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
