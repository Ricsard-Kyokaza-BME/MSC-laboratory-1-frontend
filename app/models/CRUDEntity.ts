import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
export abstract class CRUDEntity {
  id: string;
  static basePath: string = '/api/';
  static path: string;

  constructor()
  constructor(id: string)
  constructor(id?: string) {
    this.id = id;
  }

  public static findById(http: Http, id: String, path?: String) : Observable<any[]> {
    return http.get(CRUDEntity.basePath + (path ? path+'/' : this.path) + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public save(http: Http): Observable<any[]> {
    return http.post(CRUDEntity.basePath + this.getPath(), this)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteEntity(http: Http): Observable<any[]> {
    return http.delete(CRUDEntity.basePath + this.getPath() + '/' + this.id)
      .map((res:Response) => res.text())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getPath(): String {
    return this.constructor["path"];
  }
}
