import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import BehaviorSubjectItem from '../utils/behavior-subject-item';

export const ITEM_INITIAL_STATE = null;

export type HttpMethod = (...args: any[]) => Observable<any>;

export default class ItemService<T> extends BehaviorSubjectItem<T[] | null> {
  public loading: BehaviorSubjectItem<boolean> = new BehaviorSubjectItem(false);

  constructor(protected http: HttpClient) {
    super(ITEM_INITIAL_STATE);
  }

  protected get<C>(url: string, options?: any): Observable<C> {
    return this.http.get<C>(url, { ...options, observe: 'body', responseType: 'json' }).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        console.error(err);
        throw new Error('Something went wrong!');
      }),
      map((data) => data as unknown as C),
    );
  }

  protected post<C>(url: string, body: any | null, options?: any): Observable<C> {
    return this.http.post<C>(url, body, { ...options, observe: 'body', responseType: 'json' }).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        console.error(err);
        throw new Error('Something went wrong!');
      }),
      map((data) => data as unknown as C),
    );
  }

  protected put(url: string, body: any | null, options?: any): Observable<void | Object> {
    return this.http.put(url, body, options).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        console.error(err);
        throw new Error('Something went wrong!');
      }),
    );
  }

  protected delete(url: string, options?: any): Observable<void | Object> {
    return this.http.delete(url, options).pipe(
      catchError((err) => {
        if (err.status === 400) {
          throw err.error.errorText;
        }
        console.error(err);
        throw new Error('Something went wrong!');
      }),
    );
  }
}
