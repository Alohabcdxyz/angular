import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  categoryDetail: Category = {
    id: 0,
    name: '',
    categoryImage: '',
  };

  url = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');

        if (id) {
          this.categoryService.getCategory(id).subscribe({
            next: (response) => {
              this.categoryDetail = response;
            },
          });
        }
      },
    });
  }

  updateCategory() {
    if (this.categoryDetail.id) {
      const formData = new FormData();
      formData.append('id', this.categoryDetail.id.toString());
      formData.append('name', this.categoryDetail.name);

      if (this.selectedFile) {
        formData.append('categoryImageView', this.selectedFile);
      }

      this.categoryService
        .UpdateCategory(this.categoryDetail.id, formData)
        .subscribe({
          next: (category) => {
            this.toastr.success('Cập nhật danh mục thành công! 💪');
            this.router.navigate(['category']);
          },
          error: (error) => {
            this.toastr.error('Cập nhật danh mục thất bại! ❗');
            console.error('Error occurred:', error);
          },
        });
    }
  }

  deleteCategory(id: number) {
    if (confirm(`Bạn có chắc muốn xóa danh mục này không`)) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          this.toastr.success('Xóa danh mục thành công! 💪');
          this.router.navigate(['category']);
        },
      });
    }
  }
}
