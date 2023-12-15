import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import UserService from '../../core/services/user.service';
import User from '../../core/models/user.model';

@Injectable()
export default class UserRegistrationService {
  public readonly form: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      Login: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      EMail: new FormControl('', [Validators.required, Validators.email]),
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
    let res: string | null = null;
    if (this.form.controls.Passwords.get('ConfirmPassword').errors?.required) {
      res = "Password confirmation cann't be empty!";
    } else if (this.form.controls.Passwords.errors?.passwordsmatch) {
      res = 'Password confirmation must match password!';
    }

    if (this.form.controls.Passwords.get('ConfirmPassword').valid) {
      return res;
    }
    return res;
  }

  submit(observer: Observer<void>) {
    if (!this.form.valid) {
      throw new Error('submit on invalid form');
    } else {
      const user = new User(
        this.form.controls.Login.value,
        this.form.controls.Passwords.get('Password').value,
      );
      user.Name = this.form.controls.Name.value;
      user.Surname = this.form.controls.Surname.value;
      user.EMail = this.form.controls.EMail.value;

      this.userService.post(user, {
        next: () => {
          observer?.next?.();
          this.router.navigate(['/menus']);
        },
        error: (msg) => observer?.error?.(msg),
        complete: () => observer?.complete?.(),
      } as Observer<void>);
    }
  }
}
