import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Observer } from 'rxjs';
import CredentialsService from '../../../core/services/credentials.service';
import UserService from '../../../core/services/user.service';
import User from '../../../core/models/user.model';

@Injectable()
export default class PasswordFormService {
  public readonly form: FormGroup;

  constructor(private userService: UserService, private credentialsService: CredentialsService) {
    this.form = new FormGroup({
      Passwords: new FormGroup(
        {
          Password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            this.SpecialCharactersPasswordValidator,
          ]),

          ConfirmPassword: new FormControl('', [Validators.required]),
        },
        this.PasswordsMatchValidator,
      ),
    });
  }

  public SpecialCharactersPasswordValidator(control: FormControl): ValidationErrors | null {
    let regexp = new RegExp('[0-9]+');
    if (!regexp.test(control.value)) {
      return { specialcharacters: { cotainsSpecialCharacters: false } };
    }

    regexp = new RegExp('[A-Za-z]+');
    if (!regexp.test(control.value)) {
      return { specialcharacters: { cotainsSpecialCharacters: false } };
    }

    return null;
  }

  public PasswordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('Password').value !== control.get('ConfirmPassword').value) {
      return { passwordsmatch: { passwordsdontmatch: true } };
    }
    return null;
  }

  public ValidatePassword(): string | null {
    if (
      this.form.controls.Passwords.get('Password').valid ||
      this.form.controls.Passwords.get('Password').pristine
    ) {
      return null;
    }

    let res: string | null = null;
    if (this.form.controls.Passwords.get('Password').errors?.required) {
      res = "Password can't be empty!";
    } else if (this.form.controls.Passwords.get('Password').errors?.minlength) {
      res = "Password's minimum number of characters is 5!";
    } else if (this.form.controls.Passwords.get('Password').errors?.specialcharacters) {
      res = 'Password has to contain both letters and digits!';
    }
    return res;
  }

  public ValidatePasswordConfirmation(): string | null {
    if (this.form.controls.Passwords.get('ConfirmPassword').pristine) {
      return null;
    }

    if (this.form.controls.Passwords.get('ConfirmPassword').errors?.required) {
      return "Password confirmation cann't be empty!";
    }
    if (this.form.controls.Passwords.errors?.passwordsmatch) {
      return 'Password confirmation must match password!';
    }

    return null;
  }

  submit(observer: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const user = new User(
        this.credentialsService.getLogin(),
        this.form.controls.Passwords.get('Password').value,
      );

      this.userService.changePassword(user).subscribe({
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
  }
}
