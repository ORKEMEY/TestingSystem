import { Component, OnDestroy } from '@angular/core';
import InfoBoxHandler from '../../shared/utils/info-box-handler';
import MainColorService from '../../core/services/main-color.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export default class SettingsComponent implements OnDestroy {
  InfoBox: InfoBoxHandler = new InfoBoxHandler();

  public color: string = '#ffffff';

  constructor(private mainColorService: MainColorService) {
    this.color = this.mainColorService.value || this.color;
  }

  colorChanged() {
    this.mainColorService.applyColor(this.color);
  }

  save() {
    this.mainColorService.saveAsDefault(this.color);
    this.InfoBox.Info('Main color successfully changed!');
  }

  reset() {
    this.mainColorService.resetToDefault();
    this.color = this.mainColorService.value || this.color;
  }

  ngOnDestroy() {
    this.reset();
  }
}
