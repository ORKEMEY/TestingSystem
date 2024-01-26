import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ItemService from './item.service';
import Model from '../models/model.model';

@Injectable({ providedIn: 'root' })
export default class ModelService extends ItemService<Model> {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getById(id: number): Observable<Model> {
    return this.get<Model>(`api/Models/${id}`);
  }

  public refreshModels() {
    this.get<Model[]>('api/Models').subscribe({
      next: (data: Model[]) => this.subject.next(data),
      error: (err) => {
        console.error(err);
        this.subject.next(null);
      },
    });
  }

  public searchModelByName(name: string): Observable<Model> {
    return this.get<Model>(`api/Models/search?name=${name}`);
  }

  public postModel(model: Model): Observable<number> {
    return this.post<number>('api/Models', model);
  }

  public putModel(model: Model): Observable<void | Object> {
    return this.put('api/Models', model);
  }

  public deleteModelType(modelId: number): Observable<void | Object> {
    return this.delete(`api/Models/${modelId}`);
  }
}
