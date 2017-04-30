import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export abstract class CRUDEntity {
  static basePath = '/api/';
  static path: string;

  id: string;

  public static findById(http: Http, id: String, path?: String): Observable<any[]> {
    return http.get(CRUDEntity.basePath + (path ? path + '/' : this.path) + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  constructor(id?: string) {
    this.id = id;
  }

  public save(http: Http): Observable<any[]> {
    return http.post(CRUDEntity.basePath + this.getPath(), this)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public update(http: Http): Observable<any[]> {
    return http.put(CRUDEntity.basePath + this.getPath() + this.id, this)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteEntity(http: Http): Observable<any[]> {
    return http.delete(CRUDEntity.basePath + this.getPath() + this.id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getPath(): String {
    return this.constructor['path'];
  }
}
