import { Component } from '@angular/core';
import ThemeService from '../../core/services/theme.service';

@Component({
  selector: 'theme-switch',
  templateUrl: 'theme-switch.component.html',
  styleUrls: ['theme-switch.component.scss'],
})
export default class ThemeSwitchComponent {
  public isDarkModeOn: boolean = false;

  constructor(private themeService: ThemeService) {
    this.isDarkModeOn = this.themeService.value;
  }

  onThemeSwitched() {
    this.themeService.value = this.isDarkModeOn;
  }
}
