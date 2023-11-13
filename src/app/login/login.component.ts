import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa fa-eye-slash';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.role == 2) {
            this.loginForm.reset();
            this.toastr.success('Đăng nhập thành công! 💪');
            this.router.navigate(['']);
          } else {
            this.toastr.error('Đăng nhập thất bại ❗');
          }
        },
        error: (err) => {
          this.toastr.error('Đăng nhập thất bại ❗');
        },
      });
    } else {
      console.log('Form is not valid');
      this.validateAllFormFields(this.loginForm);
      this.toastr.warning('Bạn có nhập thiếu thông tin gì không 🤔');
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'fa-solid fa-eye')
      : (this.eyeIcon = 'fa-solid fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
