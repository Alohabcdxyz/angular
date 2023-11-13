import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  searchText: string = '';
  category: Category[] = [];

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (category) => {
        this.category = category;
      },
      error: (response) => {
        console.log('Error:', response); // Log any errors
      },
    });
  }
}
