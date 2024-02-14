import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import ThemeService from '../../core/services/theme.service';

@Component({
  selector: 'theme-switch',
  templateUrl: 'theme-switch.component.html',
  styleUrls: ['theme-switch.component.scss'],
})
export default class ThemeSwitchComponent implements OnDestroy {
  public isDarkModeOn: boolean = false;

  private ThemeSub: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
  ) {
    this.isDarkModeOn = this.themeService.value;
    this.ThemeSub = this.themeService.value$.subscribe({
      next: () => {
        this.setTheme();
      },
    });
  }

  onThemeSwitched() {
    this.themeService.value = this.isDarkModeOn;
  }

  setTheme() {
    if (this.themeService.value) {
      this.renderer.addClass(this.document.body, 'theme-dark');
    } else this.renderer.removeClass(this.document.body, 'theme-dark');
  }

  ngOnDestroy() {
    this.ThemeSub?.unsubscribe();
  }
}
