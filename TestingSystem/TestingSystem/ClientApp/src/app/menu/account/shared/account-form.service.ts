import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import UserService from '../../../core/services/user.service';
import User from '../../../core/models/user.model';
import Customer from '../../../core/models/customer.model';

@Injectable()
export default class AccountFormService {
  public readonly form: FormGroup;

  private customer: Customer = null;

  public get Customer(): Customer {
    return this.customer;
  }

  public set Customer(customer) {
    this.customer = customer;
    this.setFormVals(this.customer);
  }

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      Login: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      EMail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public ValidateLogin(): string | null {
    if (this.form.controls.Login.valid || this.form.controls.Login.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Login.errors?.required) {
      res = "Login can't be empty!";
    }
    return res;
  }

  public ValidateName(): string | null {
    if (this.form.controls.Name.valid || this.form.controls.Name.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Name.errors?.required) {
      res = "Name can't be empty!";
    }
    return res;
  }

  ValidateSurname(): string | null {
    if (this.form.controls.Surname.valid || this.form.controls.Surname.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Surname.errors?.required) {
      res = "Surname can't be empty!";
    }
    return res;
  }

  ValidateEMail(): string | null {
    if (this.form.controls.EMail.valid || this.form.controls.EMail.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.EMail.errors?.required) {
      res = "E-Mail can't be empty!";
    }
    if (this.form.controls.EMail.errors?.email) {
      res = 'E-Mail is invalid!';
    }

    return res;
  }

  submit(password?: string, observer?: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const user = this.readFormVals();
      user.password = password || null;
      this.userService.putCurrentUser(user, observer);
    }
  }

  private readFormVals(): User {
    const name = this.form.controls.Name.value;
    const login = this.form.controls.Login.value;
    const surname = this.form.controls.Surname.value;
    const eMail = this.form.controls.EMail.value;
    const user = new User(login, null);
    user.surname = surname;
    user.name = name;
    user.eMail = eMail;
    return user;
  }

  private setFormVals(customer: Customer | null): void {
    this.form.controls.Name.setValue(customer?.name || '');
    this.form.controls.Login.setValue(customer?.login || '');
    this.form.controls.Surname.setValue(customer?.surname || '');
    this.form.controls.EMail.setValue(customer?.eMail || '');
  }

  public reset() {
    this.form.reset();
    if (this.Customer) {
      this.setFormVals(this.Customer);
    }
  }
}
