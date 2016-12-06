import {Role} from "./role";

export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _roles: Array<Role>;

  constructor()
  constructor(id?: string, firstName?: string, lastName?: string, email?: string, roles?: Array<Role>) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._roles = roles;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): Array<Role> {
    return this._roles;
  }

  set roles(value: Array<Role>) {
    this._roles = value;
  }
}
