import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer } from 'rxjs';
import BasicSettingsFormService from '../shared/basic-settings-form.service';
import TestService from '../../../core/services/test.service';
import Test from '../../../core/models/test.model';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';
import InfoBoxHandler from '../../../shared/utils/info-box-handler';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'test-settings-component',
  templateUrl: './test-settings.component.html',
  styleUrls: ['./test-settings.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class TestSettingsComponent {
  // #region msgBoxes
  NameAlertBox: AlertBoxHandler = new AlertBoxHandler();

  NumberOfVariantsAlertBox: AlertBoxHandler = new AlertBoxHandler();

  TimeAlertBox: AlertBoxHandler = new AlertBoxHandler();

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  InfoBox: InfoBoxHandler = new InfoBoxHandler();
  // #endregion

  public get form(): FormGroup {
    return this.basicSettingsForm.form;
  }

  private id: number = 0;

  private test: Test = null;

  public get Test(): Test {
    return this.test;
  }

  public set Test(item: Test) {
    this.test = item;
    this.basicSettingsForm.Test = this.test;
    this.validateForm();
  }

  constructor(
    private basicSettingsForm: BasicSettingsFormService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
      this.loadTest();
    });
  }

  private loadTest() {
    if (this.id !== 0) {
      this.testService.getOwnedById(this.id).subscribe({
        next: (item) => {
          this.Test = item;
        },
        error: (err) => {
          if (typeof err !== 'string')
            this.WarningBox.Warn("Ooops, something went wrong! Couldn't load data");
          else this.WarningBox.Warn(err);
        },
        complete: () => console.log('comlete'),
      } as Observer<Test>);
    } else {
      this.Test = null;
    }
  }

  // #region validation
  onNameChange() {
    const res = this.basicSettingsForm.validateName();

    if (!res) {
      this.NameAlertBox.hideAlert();
    } else {
      this.NameAlertBox.Alert(res);
    }
  }

  onNumberOfVariantsChange() {
    const res = this.basicSettingsForm.validateNumberOfVariants();

    if (!res) {
      this.NumberOfVariantsAlertBox.hideAlert();
    } else {
      this.NumberOfVariantsAlertBox.Alert(res);
    }
  }

  onTimeChange() {
    const res = this.basicSettingsForm.validateTime();

    if (!res) {
      this.TimeAlertBox.hideAlert();
    } else {
      this.TimeAlertBox.Alert(res);
    }
  }

  validateForm() {
    this.onNameChange();
    this.onNumberOfVariantsChange();
    this.onTimeChange();
  }
  // #endregion

  // #region submition

  submit() {
    try {
      if (this.id === 0) {
        this.submitPost();
      } else {
        this.submitPut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private submitPost() {
    this.basicSettingsForm.submitPost({
      next: (itemId) => {
        this.router.navigate([
          '/menus/menu/testmenu/test/',
          itemId,
          { outlets: { primary: ['settings'], nav: ['testmenunav'] } },
        ]);
        this.InfoBox.Info('Test succesfully created!');
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't create test");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<number>);
  }

  private submitPut() {
    this.basicSettingsForm.submitPut(this.id, {
      next: () => {
        this.InfoBox.Info('Changes saved!');
        this.loadTest();
      },
      error: (errMsg: string) => {
        if (typeof errMsg !== 'string')
          this.WarningBox.Warn("Ooops, something went wrong! Couldn't save changes");
        else this.WarningBox.Warn(errMsg);
      },
    } as Observer<void>);
  }
  // #endregion
}
