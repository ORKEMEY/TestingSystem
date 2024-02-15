import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { expandOnEnterAnimation, collapseOnLeaveAnimation } from 'angular-animations';
import ThemeService from '../../core/services/theme.service';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    expandOnEnterAnimation({ duration: 200 }),
    collapseOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class AlertComponent implements OnDestroy {
  @Input()
  message: string = null;

  @Input()
  public isVisible: boolean = false;

  public isDarkModeOn: boolean;

  private ThemeSub: Subscription;

  constructor(private themeService: ThemeService) {
    this.ThemeSub = this.themeService.value$.subscribe({
      next: (val) => {
        this.isDarkModeOn = val;
      },
    });
  }

  ngOnDestroy() {
    this.ThemeSub?.unsubscribe();
  }
}
