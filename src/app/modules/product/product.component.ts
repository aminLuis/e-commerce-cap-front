import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormProductComponent } from './form-product/form-product.component';
import { TableProductComponent } from './table-product/table-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,
    MatButtonModule,
    TableProductComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  constructor(private productService: ProductServiceService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
  }

  public openDialog(): void {
    this.dialog.open(FormProductComponent,{ width: '35rem' });
  }

}
