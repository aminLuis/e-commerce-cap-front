export interface ProductResponse {
    id:          string;
    name:        string;
    description: string;
    price:       number;
    category:    Category;
}

export interface Category {
    id:       string;
    name:     string;
    products: null;
}

export interface ProductRequest {
    id:          string;
    name:        string;
    description: string;
    price:       number;
    category:    Categoryy;
}

export interface Categoryy {
    id:       string;
    name:     string;
}