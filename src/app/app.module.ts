import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { OrderComponent } from './order/order.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotConfirmOrderComponent } from './order-management/not-confirm-order/not-confirm-order.component';
import { ConfirmOrderComponent } from './order-management/confirm-order/confirm-order.component';
import { DoneOrderComponent } from './order-management/done-order/done-order.component';
import { CancelOrderComponent } from './order-management/cancel-order/cancel-order.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './category/search.pipe';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DetailNewsComponent } from './news/detail-news/detail-news.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    MainLayoutComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    AddEditProductComponent,
    OrderComponent,
    EditProfileComponent,
    NotConfirmOrderComponent,
    ConfirmOrderComponent,
    DoneOrderComponent,
    CancelOrderComponent,
    SearchPipe,
    ListNewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    DetailNewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Display time in milliseconds
      positionClass: 'toast-top-right', // Customize the position
      preventDuplicates: true, // Prevent duplicate toasts
      closeButton: true, // Show close button
      enableHtml: true, // Enable HTML in messages
    }),
    NgxPaginationModule,
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
