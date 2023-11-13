import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent {
  addNewsRequest: News = {
    id: 0,
    title: '',
    thumbnail: '',
    detail: '',
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
    private newsService: NewsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addNews() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.addNewsRequest.title);
      formData.append('detail', this.addNewsRequest.detail);
      formData.append('thumbnailImage', this.selectedFile);

      this.newsService.addNews(formData).subscribe({
        next: (news) => {
          this.toastr.success('Thêm bài viết thành công! 💪');
          this.router.navigate(['news']);
        },
        error: (error) => {
          this.toastr.error('Thêm bài viết thất bại ❗');
          console.error('Error occurred:', error);
        },
      });
    } else {
      this.toastr.error('Thêm bài viết thất bại ❗');
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
