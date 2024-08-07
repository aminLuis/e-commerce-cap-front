import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/product/product.component';
import { OrderComponent } from './modules/order/order.component';
import { InventoryComponent } from './modules/inventory/inventory.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'inventory', component: InventoryComponent }
];
