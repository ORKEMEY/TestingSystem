import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Observer } from 'rxjs';
import TestService from '../../../core/services/test.service';
import Test from '../../../core/models/test.model';

@Injectable()
export default class BasicSettingsFormService {
  public readonly form: FormGroup;

  private test: Test = null;

  public get Test(): Test {
    return this.test;
  }

  public set Test(setTest) {
    this.test = setTest;
    this.setFormVals(this.test);
  }

  constructor(private testService: TestService) {
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl(''),
      NumberOfVariants: new FormControl('', [Validators.required, Validators.max(100)]),
      IsAccessOpen: new FormControl(true),
      Duration: new FormGroup({
        Hours: new FormControl('', [Validators.min(0), Validators.max(24)]),
        Minutes: new FormControl('', [Validators.min(0), Validators.max(59)]),
      }),
      Time: new FormGroup(
        {
          OpeningTime: new FormControl(''),
          ClosureTime: new FormControl(''),
        },
        [this.TimeOrderValidator, this.TimeDifferenceValidator],
      ),
    });
  }

  public validateName(): string | null {
    if (this.form.controls.Name.valid || this.form.controls.Name.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Name.errors?.required) {
      res = "Name cann't be empty!";
    }
    return res;
  }

  public validateNumberOfVariants(): string | null {
    if (this.form.controls.NumberOfVariants.valid || this.form.controls.NumberOfVariants.pristine) {
      return null;
    }
    if (this.form.controls.NumberOfVariants.errors?.required) {
      return "Variants number cann't be 0!";
    }
    if (this.form.controls.NumberOfVariants.errors?.max) {
      return "Variants number cann't greater than 100!";
    }
    return null;
  }

  public validateTime(): string | null {
    if (this.form.controls.Time.valid || this.form.controls.Time.pristine) {
      return null;
    }

    if (this.form.controls.Time.errors?.TimeOrderValidation) {
      return "Closure can't happen before opening or simultaneously!";
    }
    if (this.form.controls.Time.errors?.TimeDifferenceValidation) {
      return 'Minimum open period is 1 minute!';
    }
    return null;
  }

  public TimeOrderValidator(control: AbstractControl): ValidationErrors | null {
    const nullDate = new Date(null).getTime();
    let opDate;
    let clDate;
    if (control.get('OpeningTime').value === '') {
      opDate = nullDate;
    } else {
      opDate = new Date(control.get('OpeningTime').value).getTime();
    }

    if (control.get('ClosureTime').value === '') {
      clDate = nullDate;
    } else {
      clDate = new Date(control.get('ClosureTime').value).getTime();
    }
    if (nullDate === clDate || nullDate === opDate) {
      return null;
    }

    if (opDate >= clDate) {
      return { TimeOrderValidation: { TimeOrderValid: false } };
    }
    return null;
  }

  public TimeDifferenceValidator(control: AbstractControl): ValidationErrors | null {
    const opDate = new Date(control.get('OpeningTime').value).getTime();
    const clDate = new Date(control.get('ClosureTime').value).getTime();
    const minute = 1000 * 60;
    const diff = Math.abs(clDate - opDate);
    if (diff < minute) {
      return { TimeDifferenceValidation: { TimeDifferenceValid: false } };
    }
    return null;
  }

  submitPost(observer?: Observer<number>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const test = this.readFormVals();
      this.testService.postOwnedTest(test, observer);
    }
  }

  submitPut(id: number, observer?: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const test = this.readFormVals();
      test.id = id;

      this.testService.putOwnedTest(test, observer);
    }
  }

  private readFormVals(): Test {
    const name = this.form.controls.Name.value;
    const description = this.form.controls.Description.value;
    const numberOfVariants = this.form.controls.NumberOfVariants.value;
    const isAccessOpen = this.form.controls.IsAccessOpen.value;

    let duration;
    const hours = this.form.controls.Duration.get('Hours').value;
    const minutes = this.form.controls.Duration.get('Minutes').value;
    if (
      (hours === '' && minutes === '') ||
      (Number.parseInt(hours, 10) === 0 && Number.parseInt(minutes, 10) === 0)
    ) {
      duration = null;
    } else {
      let strHours;
      let strMin;
      if (hours !== '') {
        strHours = hours < 10 ? `0${hours}` : `${hours}`;
      } else {
        strHours = '00';
      }
      if (minutes !== '') {
        strMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
      } else {
        strMin = '00';
      }
      duration = `${strHours}:${strMin}:00`;
    }

    const opTime = this.form.controls.Time.get('OpeningTime').value || null;
    const clTime = this.form.controls.Time.get('ClosureTime').value || null;

    const test = new Test(name, duration, opTime, clTime, numberOfVariants, description);
    test.isAccessOpen = isAccessOpen;
    return test;
  }

  private setFormVals(test: Test | null): void {
    this.form.controls.Name.setValue(test?.name || '');
    this.form.controls.Description.setValue(test?.description || '');
    this.form.controls.NumberOfVariants.setValue(test?.numberOfVariants || '');
    this.form.controls.IsAccessOpen.setValue(test?.isAccessOpen || true);

    const duration = test?.duration?.split(':') || null;
    if (duration !== null) {
      this.form.controls.Duration.get('Hours').setValue(duration[0] || '');
      this.form.controls.Duration.get('Minutes').setValue(duration[1] || '');
    } else {
      this.form.controls.Duration.get('Hours').setValue('');
      this.form.controls.Duration.get('Minutes').setValue('');
    }

    this.form.controls.Time.get('OpeningTime').setValue(test?.openingTime || '');
    this.form.controls.Time.get('ClosureTime').setValue(test?.closureTime || '');
  }
}
