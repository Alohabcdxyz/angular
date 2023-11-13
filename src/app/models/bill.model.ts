import { Register } from './register.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  productString: string;

  // Add other product properties here
}

export interface BillDetail {
  quantity: number;
  price: number;
  billId: number;
  productId: number;
  bill: Bill;
  product: Product; // Include the product information
}

export interface Bill {
  id: number;
  userId: number;
  total: number;
  status: number;
  phone: string;
  address: string;
  note: string | null;
  register: Register | null;
  billDetails: BillDetail[];
  created: string;
}
