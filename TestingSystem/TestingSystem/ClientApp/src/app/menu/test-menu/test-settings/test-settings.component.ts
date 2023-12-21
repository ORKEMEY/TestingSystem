import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import BasicSettingsFormService from '../shared/basic-settings-form.service';
import TestService from '../../../core/services/test.service';
import Test from '../../../core/models/test.model';
import Alert from '../../../core/alert';

@Component({
  selector: 'test-settings-component',
  templateUrl: './test-settings.component.html',
  styleUrls: ['./test-settings.component.css'],
})
export default class TestSettingsComponent {
  @ViewChild('alertNameDiv', { static: false })
  alertNameDiv: ElementRef | undefined;

  @ViewChild('alertNumberOfVariantsDiv', { static: false })
  alertNumberOfVariantsDiv: ElementRef | undefined;

  @ViewChild('alertTimeDiv', { static: false })
  alertTimeDiv: ElementRef | undefined;

  @ViewChild('alertCommonDiv', { static: false })
  alertCommonDiv: ElementRef | undefined;

  isWarningVisible: Boolean = false;

  isInfoVisible: Boolean = false;

  warningMessage: string = '';

  infoMessage: string = '';

  public get form(): FormGroup {
    return this.basicSettingsForm.form;
  }

  private id: number = 0;

  private test: Test = null;

  public get Test(): Test {
    if (this.id !== 0 && this.test === null) {
      this.loadTest();
    }
    return this.test;
  }

  public set Test(item: Test) {
    this.test = item;
    this.basicSettingsForm.Test = this.test;
  }

  constructor(
    private basicSettingsForm: BasicSettingsFormService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = Number.parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.loadTest();
  }

  private loadTest() {
    if (this.id !== 0) {
      this.testService.getOwnedById(this.id, {
        next: (item) => {
          this.Test = item;
        },
        error: (err) => this.Warn(err),
        complete: () => console.log('comlete'),
      } as Observer<Test>);
    } else {
      this.Test = null;
    }
  }

  onNameChange() {
    const res = this.basicSettingsForm.validateName();

    if (res === null) {
      Alert.hideAlertMessage(this.alertNameDiv);
    } else {
      Alert.alertMessage(this.alertNameDiv, res);
    }
  }

  onNumberOfVariantsChange() {
    const res = this.basicSettingsForm.validateNumberOfVariants();

    if (res === null) {
      Alert.hideAlertMessage(this.alertNumberOfVariantsDiv);
    } else {
      Alert.alertMessage(this.alertNumberOfVariantsDiv, res);
    }
  }

  onTimeChange() {
    const res = this.basicSettingsForm.validateTime();

    if (res === null) {
      Alert.hideAlertMessage(this.alertTimeDiv);
    } else {
      Alert.alertMessage(this.alertTimeDiv, res);
    }
  }

  submit() {
    try {
      if (this.id === 0) {
        this.basicSettingsForm.submitPost({
          next: (itemId) => {
            this.id = itemId;
            this.loadTest();
            this.Info('Test succesfully created!');
          },
          error: (errMsg: string) => this.Warn(errMsg),
        } as Observer<number>);
      } else {
        this.basicSettingsForm.submitPut(this.id, {
          next: () => this.Info('Changes saved!'),
          error: (errMsg: string) => this.Warn(errMsg),
        } as Observer<void>);
      }
    } catch (error) {
      console.error(error);
    }
  }

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }

  Info(msg: string) {
    this.infoMessage = msg;
    this.isInfoVisible = true;
  }

  hideInfo() {
    this.infoMessage = '';
    this.isInfoVisible = false;
  }
}
