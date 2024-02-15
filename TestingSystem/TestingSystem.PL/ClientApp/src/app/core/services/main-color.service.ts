import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import BehaviorSubjectItem from '../utils/behavior-subject-item';

@Injectable({ providedIn: 'root' })
export default class MainColorService extends BehaviorSubjectItem<string> {
  set value(value: string) {
    localStorage.setItem(this.themeKey, `${value}`);
    super.value = value;
  }

  get value(): string {
    return super.value;
  }

  public readonly themeKey: string = 'mainColor';

  public readonly defaultColor: string = '#007bff';

  constructor(@Inject(DOCUMENT) private document: Document) {
    super('');

    this.value = localStorage.getItem(this.themeKey) || this.defaultColor;

    this.applyColor(this.value);
  }

  saveAsDefault(color: string) {
    this.value = color;
  }

  resetToDefault() {
    this.applyColor(this.value);
  }

  applyColor(color: string) {
    if (!color) return;
    this.document.documentElement.style.setProperty('--bs-color', color);
    this.document.documentElement.style.setProperty('--bs-color-translucent', `${color}99`);
  }
}
