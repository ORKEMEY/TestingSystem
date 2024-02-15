import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import BehaviorSubjectItem from '../utils/behavior-subject-item';

@Injectable({ providedIn: 'root' })
export default class ThemeService extends BehaviorSubjectItem<boolean> {
  set value(value: boolean) {
    localStorage.setItem(this.themeKey, `${value}`);
    super.value = value;
    this.setTheme();
  }

  get value(): boolean {
    return super.value;
  }

  public readonly themeKey: string = 'isDarkModeOn';

  constructor(@Inject(DOCUMENT) private document: Document) {
    super(false);
    this.value = localStorage.getItem(this.themeKey) === 'true';
  }

  private setTheme() {
    if (this.value) {
      this.document.documentElement.classList.add('theme-dark');
    } else this.document.documentElement.classList.remove('theme-dark');
  }
}
