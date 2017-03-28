import {animate, style, transition, trigger} from "@angular/core";

export class Utility {
  public static fadeInOutAnimation = trigger('fadeInOut', [
    transition(':enter', [
      style({transform: 'translateY(-10%)', opacity: 0}),
      animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0)', opacity: 1}),
      animate('200ms', style({transform: 'translateY(-10%)', opacity: 0}))
    ])
  ]);


  static mapToField(sourceArray: Array<any>, field: string): Array<string> {
    let mappedItems: Array<string> = [];
    for(let i = 0; i < sourceArray.length; i++) {
      mappedItems.push(sourceArray[i][field]);
    }
    return mappedItems;
  }
}
