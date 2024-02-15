import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { bounceInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';
import { Subscription } from 'rxjs';
import ThemeService from '../../core/services/theme.service';

@Component({
  selector: 'info-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [
    bounceInOnEnterAnimation({ duration: 600 }),
    zoomOutOnLeaveAnimation({ duration: 200 }),
  ],
})
export default class InfoComponent implements OnDestroy {
  @Input()
  message: string = null;

  @Input()
  public isVisible: boolean = false;

  @Output() closeButtonPushed = new EventEmitter<void>();

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

  hide() {
    this.isVisible = false;
    this.closeButtonPushed.emit();
  }
}
