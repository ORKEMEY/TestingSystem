import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import UserService from '../../../core/services/user.service';
import User from '../../../core/models/user.model';

@Injectable()
export default class LoginFormService {
  public readonly form: FormGroup;

  private login: string = null;

  public get Login(): string {
    return this.login;
  }

  public set Login(login: string) {
    this.login = login;
    this.form.controls.Login.setValue(login || '');
  }

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      Login: new FormControl('', Validators.required),
    });
  }

  public ValidateLogin(): string | null {
    if (this.form.controls.Login.valid || this.form.controls.Login.pristine) {
      return null;
    }

    if (this.form.controls.Login.errors?.required) {
      return "Login can't be empty!";
    }
    return null;
  }

  submit(password: string, observer: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const user = new User(this.form.controls.Login.value, password);

      this.userService.changeLogin(user).subscribe({
        next: () => {
          observer?.next?.();
        },
        error: (msg) => observer?.error?.(msg),
        complete: () => observer?.complete?.(),
      });
    }
  }

  public reset() {
    this.form.reset();
    if (this.Login) {
      this.form.controls.Login.setValue(this.Login || '');
    }
  }
}
