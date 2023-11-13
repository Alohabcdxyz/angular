import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { OrderComponent } from './order/order.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NotConfirmOrderComponent } from './order-management/not-confirm-order/not-confirm-order.component';
import { ConfirmOrderComponent } from './order-management/confirm-order/confirm-order.component';
import { CancelOrderComponent } from './order-management/cancel-order/cancel-order.component';
import { DoneOrderComponent } from './order-management/done-order/done-order.component';
import { ListNewsComponent } from './news/list-news/list-news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { DetailNewsComponent } from './news/detail-news/detail-news.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'news', component: ListNewsComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-news', component: AddNewsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product', component: ListProductComponent },
      { path: '', component: DashboardComponent },
      {
        path: 'category/edit/:id',
        component: EditCategoryComponent,
      },
      {
        path: 'news/edit/:id',
        component: EditNewsComponent,
      },
      {
        path: 'news/detail/:id',
        component: DetailNewsComponent,
      },
      {
        path: 'profile/edit/:id',
        component: EditProfileComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'order/not-confirm-order',
        component: NotConfirmOrderComponent,
      },
      {
        path: 'order/confirm-order',
        component: ConfirmOrderComponent,
      },
      {
        path: 'order/cancel-order',
        component: CancelOrderComponent,
      },
      {
        path: 'order/done-order',
        component: DoneOrderComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
