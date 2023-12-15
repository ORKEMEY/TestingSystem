import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import UserService from '../../core/services/user.service';
import CredentialsService from '../../core/services/credentials.service';
import User from '../../core/models/user.model';

@Injectable()
export default class UserLoginService {
  public readonly form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private credentialsService: CredentialsService,
  ) {
    this.form = new FormGroup({
      Login: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  public ValidateLogin(): string | null {
    if (this.form.controls.Login.valid || this.form.controls.Login.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Login.errors?.required) {
      res = "Login cann't be empty!";
    }
    return res;
  }

  public ValidatePassword(): string | null {
    if (this.form.controls.Password.valid || this.form.controls.Password.pristine) {
      return null;
    }
    let res: string | null = null;
    if (this.form.controls.Password.errors?.required) {
      res = "Password cann't be empty!";
    } else if (this.form.controls.Password.errors?.minlength) {
      res = "Password's minimum number of characters is 5!";
    }
    return res;
  }

  submit(observer: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      this.userService.getToken(
        new User(this.form.controls.Login.value, this.form.controls.Password.value),
        {
          next: () => {
            observer?.next?.();
            if (this.credentialsService.isAdmin()) {
              this.router.navigate(['/admin-panel']);
            } else {
              this.router.navigate(['/menus']);
            }
          },
          error: (msg) => observer?.error?.(msg),
          complete: () => observer?.complete?.(),
        } as Observer<void>,
      );
    }
  }
}
