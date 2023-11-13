import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  productList$!: Observable<any[]>;
  categoryList$!: Observable<any[]>;
  categoryMap: Map<number, string> = new Map();
  // categoryList: any = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  @Input() product: any;
  id: number = 0;
  name: string = '';
  infor: string = '';
  price: number = 0;
  color: string = '';
  quantity: number = 0;
  categoryId!: number;
  productImage: File | null = null;

  ngOnInit(): void {
    this.id = this.product.id;
    this.name = this.product.name;
    this.infor = this.product.infor;
    this.price = this.product.price;
    this.quantity = this.product.quantity;
    this.categoryId = this.product.categoryId;
    this.productList$ = this.productService.getAllProductList();
    this.categoryList$ = this.categoryService.getAllCategory();
  }

  addProduct() {
    var formData = new FormData();
    formData.append('name', this.name);
    formData.append('infor', this.infor);
    formData.append('color', this.color);
    formData.append('price', this.price.toString());
    formData.append('quantity', this.quantity.toString());
    formData.append('categoryId', this.categoryId.toString());
    if (this.productImage) {
      formData.append('productImage', this.productImage);
    }

    this.productService.addProduct(formData).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
      this.router.navigate(['product']);
    });
  }

  onImageChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.productImage = fileList[0];
    }
  }

  updateProduct() {
    var formData = new FormData();
    var id: number = this.id;

    formData.append('id', this.id.toString());
    formData.append('name', this.name);
    formData.append('color', this.color);
    formData.append('infor', this.infor);
    formData.append('price', this.price.toString());
    formData.append('quantity', this.quantity.toString());
    formData.append('categoryId', this.categoryId.toString());
    if (this.productImage) {
      formData.append('productImage', this.productImage);
    }

    this.productService.updateProduct(id, formData).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none';
        }
      }, 4000);
      this.router.navigate(['product']);
    });
  }
}
