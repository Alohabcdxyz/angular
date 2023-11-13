import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Bill, Product } from 'src/app/models/bill.model';
import { Register } from 'src/app/models/register.model';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-not-confirm-order',
  templateUrl: './not-confirm-order.component.html',
  styleUrls: ['./not-confirm-order.component.scss'],
})
export class NotConfirmOrderComponent implements OnInit {
  bills$!: Observable<Bill[]>;
  products: Product[] = [];
  user: Register[] = [];
  billCount: number = 0;
  // isLoading = true;
  isLoading: boolean = true;
  isDataLoaded: boolean = false;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllBills().subscribe((bills: Bill[]) => {
      this.bills$ = of(bills.filter((bill) => bill.status === 0));
      console.log(
        'so luong bill',
        bills.filter((bill) => bill.status === 0).length
      );
    });
    this.productService.getAllProductList().subscribe((data) => {
      this.products = data;
      this.isLoading = false; // Set isLoading to false when data is loaded
      this.isDataLoaded = true;
    });
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
    this.orderService.getAllBills().subscribe((bills: Bill[]) => {
      this.billCount = bills.filter((bill) => bill.status === 0).length;
      console.log('so luong bill 1', this.billCount);
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
