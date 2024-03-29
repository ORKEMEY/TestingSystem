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

    if (this.form.controls.Login.errors?.required) {
      return "Login can't be empty!";
    }
    return null;
  }

  public ValidateName(): string | null {
    if (this.form.controls.Name.valid || this.form.controls.Name.pristine) {
      return null;
    }

    if (this.form.controls.Name.errors?.required) {
      return "Name can't be empty!";
    }
    return null;
  }

  ValidateSurname(): string | null {
    if (this.form.controls.Surname.valid || this.form.controls.Surname.pristine) {
      return null;
    }

    if (this.form.controls.Surname.errors?.required) {
      return "Surname can't be empty!";
    }
    return null;
  }

  ValidateEMail(): string | null {
    if (this.form.controls.EMail.valid || this.form.controls.EMail.pristine) {
      return null;
    }

    if (this.form.controls.EMail.errors?.required) {
      return "E-Mail can't be empty!";
    }
    if (this.form.controls.EMail.errors?.email) {
      return 'E-Mail is invalid!';
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

    if (this.form.controls.Passwords.get('Password').errors?.required) {
      return "Password can't be empty!";
    }
    if (this.form.controls.Passwords.get('Password').errors?.minlength) {
      return "Password's minimum number of characters is 5!";
    }
    if (this.form.controls.Passwords.get('Password').errors?.specialcharacters) {
      return 'Password has to contain both letters and digits!';
    }
    return null;
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
        this.form.controls.Login.value,
        this.form.controls.Passwords.get('Password').value,
      );
      user.name = this.form.controls.Name.value;
      user.surname = this.form.controls.Surname.value;
      user.eMail = this.form.controls.EMail.value;

      this.userService.post(user).subscribe({
        next: () => {
          observer?.next?.();
          this.router.navigate(['/menus']);
        },
        error: (msg) => observer?.error?.(msg),
        complete: () => observer?.complete?.(),
      });
    }
  }
}
