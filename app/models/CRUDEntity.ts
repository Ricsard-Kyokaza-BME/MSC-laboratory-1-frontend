import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
export abstract class CRUDEntity {
  static basePath: string = 'api/';
  static path: string;

  constructor() {}

  public static findById(http: Http, id: String) : Observable<any[]> {
    return http.get(CRUDEntity.basePath + this.path + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
