import { BehaviorSubject, Observable } from 'rxjs';

export default class BehaviorSubjectItem<T> {
  protected readonly subject: BehaviorSubject<T>;

  public readonly value$: Observable<T>;

  get value(): T {
    return this.subject.value;
  }

  set value(value: T) {
    this.subject.next(value);
  }

  constructor(initialValue: T) {
    this.subject = new BehaviorSubject<T>(initialValue);
    this.value$ = this.subject.asObservable();
  }
}
