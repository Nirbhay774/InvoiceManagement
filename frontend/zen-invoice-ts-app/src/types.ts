export interface Product {
    Product_ID: number;
    Product_Name: string;
    Rate: number;
    Unit: string;
  }
  
  export interface InvoiceItem {
    product: Product;
    qty: number;
    discPercentage: number;
    netAmount: number;
    totalAmount: number;
  }
  