import {Component} from '@angular/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import Any = jasmine.Any;

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent {
  items: Array<{name: String}> = [];
  items2: Array<{name: String}> = [];

  constructor(private dragulaService: DragulaService) {
    this.items.push({name: 'A'});
    this.items.push({name: 'B'});
    this.items.push({name: 'C'});
    this.items.push({name: 'D'});

    this.items2.push({name: 'E'});
    this.items2.push({name: 'F'});
    this.items2.push({name: 'G'});
    this.items2.push({name: 'H'});

    dragulaService.dropModel.subscribe((value: Array<Any>) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value: Array<Any>) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2: Array<string> = ['Explore', 'them'];

  private onDropModel(args: Array<Any>) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args: Array<Any>) {
    let [el, source] = args;
    // do something else
  }

}
