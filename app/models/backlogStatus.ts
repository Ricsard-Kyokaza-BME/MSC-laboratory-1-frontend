export enum BacklogStatus {
  BACKLOG,
  TODO,
  IN_PROGRESS,
  DONE
}

export module BacklogStatus {

  export function keys(): Array<string>{
    let keys = Object.keys(BacklogStatus);
    return keys.slice(keys.length / 2, keys.length-1);
  }
}
