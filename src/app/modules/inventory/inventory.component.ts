import { Component } from '@angular/core';
import { TableProducComponent } from './table-produc/table-produc.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [TableProducComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

}
