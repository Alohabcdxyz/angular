import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register.model';
import { ProfileService } from '../services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: Register[] = [];
  constructor(
    private userService: ProfileService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (response) => {
        console.log('Error:', response);
      },
    });
  }
}
