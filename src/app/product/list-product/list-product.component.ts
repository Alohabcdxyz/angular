import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  searchText: any;
  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 10;
  // tableSizes: any = [5, 10, 15, 20];
  productList$!: Observable<any[]>;
  categoryList$!: Observable<any[]>;
  categoryList: any = [];
  productCount: number = 0;
  categoryMap: Map<number, string> = new Map();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productList$ = this.productService.getAllProductList();

    this.categoryList$ = this.categoryService.getAllCategory();
    this.productList$.subscribe((products) => {
      this.productCount = products.length;
    });
    this.refreshCategoryMap();
  }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.productList$ = this.productService.getAllProductList();
  // }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.productList$ = this.productService.getAllProductList();
  // }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.productService.getAllProductList();
  }

  refreshCategoryMap() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categoryList = data;
      for (let i = 0; i < data.length; i++) {
        this.categoryMap.set(
          this.categoryList[i].id,
          this.categoryList[i].name
        );
      }
      console.log(this.categoryList);
    });
  }

  modalTitle: string = '';
  activateAddEditProductComponent: boolean = false;
  product: any;

  modalAdd() {
    this.product = {
      id: 0,
      name: null,
      categoryId: null,
      quantity: 0,
      color: null,
      price: 0,
      infor: null,
    };
    this.modalTitle = 'Thêm Sản Phẩm';
    this.activateAddEditProductComponent = true;
  }

  modalEdit(item: any) {
    this.product = item;
    this.modalTitle = 'Chỉnh Sửa Sản Phẩm';
    this.activateAddEditProductComponent = true;
  }

  delete(item: any) {
    if (confirm(`Bạn có chắc muốn xóa sản phẩm này không`)) {
      this.productService.deleteProduct(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.productList$ = this.productService.getAllProductList();
      });
    }
  }
}
