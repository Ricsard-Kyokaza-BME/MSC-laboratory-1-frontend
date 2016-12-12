export enum Complexity {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FIVE = 5,
  EIGHT = 8,
  THIRTEEN = 13,
  TWENTY = 20,
  FORTY = 40,
  HUNDRED = 100
}

export module Complexity {

  export function keys(): Array<string>{
    let keys = Object.keys(Complexity);
    return keys.slice(keys.length/2, keys.length-1);
  }
}
