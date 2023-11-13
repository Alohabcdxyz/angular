import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '../services/order/order.service';
import { ProductService } from '../services/product/product.service';
import { Bill, Product } from '../models/bill.model';
import { Register } from '../models/register.model';
import { ProfileService } from '../services/profile/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  bills$!: Observable<Bill[]>;
  products: Product[] = [];
  user: Register[] = [];
  billCount: number = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    // this.bills$ = this.orderService.getAllBills();
    this.orderService.getAllBills().subscribe((bills: Bill[]) => {
      this.bills$ = of(bills.filter((bill) => bill.status !== null));
    });
    this.productService.getAllProductList().subscribe((data) => {
      this.products = data;
    });
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
    this.bills$.subscribe((bill) => {
      this.billCount = bill.length;
    });
  }

  updateOrder(id: number) {
    this.orderService.updateOrderStatus(id).subscribe({
      next: (category) => {
        this.toastr.success('Xác nhận đơn thành công! 💪');
        this.router.navigate(['order/confirm-order']);
      },
      error: (error) => {
        this.toastr.error('Xác nhận thất bại ❗');
        console.error('Error occurred:', error);
      },
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Chưa xác nhận';
      case 1:
        return 'Xác nhận đơn';
      case 2:
        return 'Đã giao thành công';
      case 3:
        return 'Đơn đã hủy';
      default:
        return 'Không rõ';
    }
  }

  getStatusStyle(status: number): { color: string } {
    let color: string;

    switch (status) {
      case 0:
        color = 'red';
        break;
      case 1:
        color = 'green';
        break;
      case 2:
        color = 'blue';
        break;
      case 3:
        color = 'red';
        break;
      default:
        color = 'black'; // Default color for unknown status
    }

    return { color };
  }
}
