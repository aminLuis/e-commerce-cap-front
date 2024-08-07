export interface OrderItem {
    id:       string;
    order:    Order;
    product:  Product;
    quantity: number;
    price:    number;
}

export interface Order {
    id:        string;
    customer:  Customer;
    orderDate: Date;
}

export interface Customer {
    id:      string;
    name:    string;
    email:   string;
    address: string;
}

export interface Product {
    id:          string;
    name:        string;
    description: string;
    price:       number;
    category:    Category;
}

export interface Category {
    id:   string;
    name: string;
}