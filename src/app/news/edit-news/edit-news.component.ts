import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
})
export class EditNewsComponent implements OnInit {
  newsDetail: News = {
    id: 0,
    title: '',
    detail: '',
    thumbnail: '',
  };
  url = '';
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
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
          this.newsService.getNews(id).subscribe({
            next: (response) => {
              this.newsDetail = response;
            },
          });
        }
      },
    });
  }

  updateNews() {
    if (this.newsDetail.id) {
      const formData = new FormData();
      formData.append('id', this.newsDetail.id.toString());
      formData.append('title', this.newsDetail.title);
      formData.append('detail', this.newsDetail.detail);

      if (this.selectedFile) {
        formData.append('thumbnailImage', this.selectedFile);
      }

      this.newsService.updateNews(this.newsDetail.id, formData).subscribe({
        next: (category) => {
          this.toastr.success('Cập nhật bài viết thành công! 💪');
          this.router.navigate(['news']);
        },
        error: (error) => {
          this.toastr.error('Cập nhật bài viết thất bại! ❗');
          console.error('Error occurred:', error);
        },
      });
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Nhập nội dung tại đây...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
}
