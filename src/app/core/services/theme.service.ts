import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import BehaviorSubjectItem from '../utils/behavior-subject-item';

@Injectable({ providedIn: 'root' })
export default class ThemeService extends BehaviorSubjectItem<boolean> {
  set value(value: boolean) {
    localStorage.setItem(this.themeKey, `${value}`);
    super.value = value;
  }

  get value(): boolean {
    return super.value;
  }

  public themeKey: string = 'isDarkModeOn';

  constructor(@Inject(DOCUMENT) private document: Document) {
    super(false);
    this.value = localStorage.getItem(this.themeKey) === 'true';
  }
}
