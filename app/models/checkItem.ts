export class CheckItem {
  done: boolean;
  content: string;

  constructor()
  constructor(done: boolean, content: string)
  constructor(done?: boolean, content?: string) {
    this.done = done;
    this.content = content;
  }
}
