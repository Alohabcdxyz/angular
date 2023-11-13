import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryrequest: Category = {
    id: 0,
    name: '',
    categoryImage: '',
  };

  url = '';

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const fileInput: HTMLInputElement = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }

    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  addEmployee() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.addCategoryrequest.name);
      formData.append('categoryImageView', this.selectedFile);

      this.categoryService.addEmployee(formData).subscribe({
        next: (category) => {
          this.toastr.success('Thêm danh mục thành công! 💪');
          this.router.navigate(['category']);
        },
        error: (error) => {
          this.toastr.error('Thêm danh mục thất bại ❗');
          console.error('Error occurred:', error);
        },
      });
    } else {
      this.toastr.error('Thêm danh mục thất bại ❗');
    }
  }
}
