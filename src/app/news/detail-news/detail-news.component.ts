import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.scss'],
})
export class DetailNewsComponent implements OnInit {
  newsDetail: News = {
    id: 0,
    title: '',
    detail: '',
    thumbnail: '',
  };

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');

        if (id) {
          this.newsService.getNews(id).subscribe({
            next: (response) => {
              this.newsDetail = response;
            },
          });
        }
      },
    });
  }

  getSanitizedDetail(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.newsDetail.detail);
  }
}
