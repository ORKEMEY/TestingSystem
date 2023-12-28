import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import Model from '../models/model.model';

@Injectable({ providedIn: 'root' })
export default class ModelService {
  private dataModels: BehaviorSubject<Model[] | null>;

  public dataModels$: Observable<Model[] | null>;

  constructor(private http: HttpClient) {
    this.dataModels = new BehaviorSubject<Model[] | null>(null);
    this.dataModels$ = this.dataModels.asObservable();
  }

  public getById(id: number, observer?: Observer<Model>) {
    this.http
      .get(`api/Models/${id}`)
      .pipe(map((data) => data as Model))
      .subscribe({
        next: (data) => observer?.next?.(data),
        error: (err) => {
          if (err.status === 400) {
            observer?.error?.(err.error.errorText);
          } else {
            console.error(err);
          }
        },
        complete: () => observer?.complete?.(),
      });
  }

  public refreshModels() {
    this.http
      .get('api/Models')
      .pipe(map((data) => data as Model[]))
      .subscribe({
        next: (data: Model[]) => this.dataModels.next(data),
        error: (err) => {
          console.error(err);
          this.dataModels.next(null);
        },
      });
  }

  public searchModelsByName(name: string, observer?: Observer<Model>) {
    this.http
      .get(`api/Models/search?name=${name}`)
      .pipe(map((data) => data as Model))
      .subscribe({
        next: (data: Model) => observer?.next?.(data),
        error: (err) => {
          console.error(err);
          observer?.error?.(err);
        },
      });
  }

  public postModel(model: Model, observer?: Observer<number>) {
    this.http.post('api/Models', model).subscribe({
      next: (id) => observer?.next?.(id as number),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public putModel(model: Model, observer?: Observer<void>) {
    this.http.put('api/Models', model).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }

  public async DeleteModelTypeAsync(modelId: number, observer?: Observer<void>) {
    await this.http.delete(`api/Models/${modelId}`).subscribe({
      next: () => observer?.next?.(),
      error: (err) => {
        if (err.status === 400) {
          observer?.error?.(err.error.errorText);
        } else {
          console.error(err);
        }
      },
      complete: () => observer?.complete?.(),
    });
  }
}
