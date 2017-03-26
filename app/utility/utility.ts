export class Utility {

  static mapToField(sourceArray: Array<any>, field: string): Array<string> {
    let mappedItems: Array<string> = [];
    for(let i = 0; i < sourceArray.length; i++) {
      mappedItems.push(sourceArray[i][field]);
    }
    return mappedItems;
  }
}
