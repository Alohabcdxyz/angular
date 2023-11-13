import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bill, Product } from 'src/app/models/bill.model';
import { Register } from 'src/app/models/register.model';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  bills$!: Observable<Bill[]>;
  products: Product[] = [];
  user: Register[] = [];
  billCount: number = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: ProfileService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllBills().subscribe((bills: Bill[]) => {
      this.bills$ = of(bills.filter((bill) => bill.status === 1));
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
