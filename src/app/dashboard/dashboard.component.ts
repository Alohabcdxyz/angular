import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  categoryCount: number = 0;
  productCount: number = 0;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categoryCount = categories.length;
        console.log(this.categoryCount);
      },
      error: (response) => {
        console.log('Error: ' + response);
      },
    });

    this.productService.getAllProductList().subscribe({
      next: (products) => {
        this.productCount = products.length;
      },
      error: (response) => {
        console.log('Error: ' + response);
      },
    });
  }
}
