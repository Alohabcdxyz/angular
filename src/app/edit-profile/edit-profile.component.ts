import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  type: string = 'password';
  eyeIcon: string = 'fa fa-eye-slash';
  isText: boolean = false;
  usesrDetail: Register = {
    userId: 0,
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private userService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const userId: any = params.get('id');

        if (userId) {
          this.userService.getProfile(userId).subscribe({
            next: (response) => {
              this.usesrDetail = response;
              console.log(response);
            },
          });
        }
      },
    });
  }

  updateUser() {
    if (this.usesrDetail.password === this.usesrDetail.confirmPassword) {
      this.userService
        .updateUser(this.usesrDetail.userId, this.usesrDetail)
        .subscribe({
          next: (response) => {
            this.toastr.success('Cập nhật thông tin người dùng thành công! 💪');
            this.router.navigate(['profile']);
          },
          error: (error) => {
            this.toastr.error('Cập nhật thông tin thất bại ❗');
            console.error('Error:', error);
          },
        });
    } else {
      this.toastr.error('Cập nhật thông tin thất bại ❗');
      console.error('Mật khẩu không khớp.');
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'fa-solid fa-eye')
      : (this.eyeIcon = 'fa-solid fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
