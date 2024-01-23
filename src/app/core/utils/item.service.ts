/* eslint-disable func-names */
import { Observable } from 'rxjs';
import BehaviorSubjectItem from './behavior-subject-item';

export const ITEM_INITIAL_STATE = null;

export type HttpMethod = (...args: any[]) => Observable<any>;

export default class ItemService<T> extends BehaviorSubjectItem<T[] | null> {
  public loading: BehaviorSubjectItem<boolean> = new BehaviorSubjectItem(false);

  constructor() {
    super(ITEM_INITIAL_STATE);
  }
}
