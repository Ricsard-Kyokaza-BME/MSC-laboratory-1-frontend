import {Component} from '@angular/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import Any = jasmine.Any;

class Product {
  name: String;
  quantity: number;
  cost: number;

  constructor(name: String, quantity: number, cost: number) {
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
  }
}

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'app/app/dashboard/dashboard.html'
})
export class DashboardComponent {
  // items: Array<{name: String}> = [];
  // items2: Array<{name: String}> = [];
  //
  // constructor(private dragulaService: DragulaService) {
  //   this.items.push({name: 'A'});
  //   this.items.push({name: 'B'});
  //   this.items.push({name: 'C'});
  //   this.items.push({name: 'D'});
  //
  //   this.items2.push({name: 'E'});
  //   this.items2.push({name: 'F'});
  //   this.items2.push({name: 'G'});
  //   this.items2.push({name: 'H'});
  //
  //   // dragulaService.setOptions('another-bag', {
  //   //   revertOnSpill: true
  //   // });
  //   // dragulaService.dropModel.subscribe((value: Array<Any>) => {
  //   //   this.onDropModel(value.slice(1));
  //   // });
  //   // dragulaService.removeModel.subscribe((value: Array<Any>) => {
  //   //   this.onRemoveModel(value.slice(1));
  //   // });
  //
  //   // dragulaService.drag.subscribe((value) => {
  //   //   console.log(`drag: ${value[0]}`);
  //   // });
  //   // dragulaService.drop.subscribe((value) => {
  //   //   console.log(`drop: ${value[0]}`);
  //   // });
  //   // dragulaService.over.subscribe((value) => {
  //   //   console.log(`over: ${value[0]}`);
  //   // });
  //   // dragulaService.out.subscribe((value) => {
  //   //   console.log(`out: ${value[0]}`);
  //   // });
  //
  //   // dragulaService.find('another-bag').drake.on('drag', (el: Any, source: Any) => {
  //   //   console.log(el);
  //   //   console.log(source);
  //   // });
  // }
  //
  // public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  // public many2: Array<string> = ['Explore', 'them'];
  //
  // private onDropModel(args: Array<Any>) {
  //   let [el, target, source] = args;
  //   // do something else
  // }
  //
  // private onRemoveModel(args: Array<Any>) {
  //   let [el, source] = args;
  //   // do something else
  // }
  //
  // public dragSuccessToBacklog(item: Any) {
  //   this.items.push(item.dragData);
  // }
  //
  // public dragSuccessToTodo(item: Any) {
  //   this.items2.push(item.dragData);
  // }

  availableProducts: Array<Product> = [];
  shoppingBasket: Array<Product> = [];

  constructor() {
    this.availableProducts.push(new Product("Blue Shoes", 3, 35));
    this.availableProducts.push(new Product("Good Jacket", 1, 90));
    this.availableProducts.push(new Product("Red Shirt", 5, 12));
    this.availableProducts.push(new Product("Blue Jeans", 4, 60));
  }

  orderedProduct(orderedProduct: Product) {
    orderedProduct.quantity--;
  }

  addToBasket($event: {dragData: any, mouseEvent: MouseEvent}) {
    let newProduct: Product = <Product>$event.dragData;
    for (let indx in this.shoppingBasket) {
      let product:Product = this.shoppingBasket[indx];
      if (product.name === newProduct.name) {
        product.quantity++;
        return;
      }
    }
    this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
  }

  totalCost():number {
    let cost:number = 0;
    for (let indx in this.shoppingBasket) {
      let product:Product = this.shoppingBasket[indx];
      cost += (product.cost * product.quantity);
    }
    return cost;
  }

}
