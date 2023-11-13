import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit {
  news: News[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;

  searchNews: string = '';
  constructor(
    private newsService: NewsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (response) => {
        console.log('Error:', response); // Log any errors
      },
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (response) => {
        console.log('Error:', response); // Log any errors
      },
    });
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (response) => {
        console.log('Error:', response); // Log any errors
      },
    });
  }

  deleteNews(id: number) {
    if (confirm(`Bạn có chắc muốn xóa bài viết này không`)) {
      this.newsService.deleteNews(id).subscribe({
        next: (response) => {
          this.toastr.success('Xóa bài viết thành công! 💪');
          this.router.navigate(['news']);
        },
      });
    }
  }
}
