export interface Inventory {
    id:       string;
    product:  Product;
    quantity: number;
}

export interface Product {
    id:          string;
    name:        string;
    description: null;
    price:       number;
    category:    Category;
}

export interface Category {
    id:       string;
    name:     string;
    products: null;
}