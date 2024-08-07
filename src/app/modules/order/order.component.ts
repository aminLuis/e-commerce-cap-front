import { Component } from '@angular/core';
import { TableOrderComponent } from './table-order/table-order.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TableOrderComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

}
