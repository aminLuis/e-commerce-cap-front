import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductServiceService } from '../../../services/product-service.service';
import { ProductResponse } from '../../../interfaces/product.interface';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-product',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './table-product.component.html',
  styleUrl: './table-product.component.scss'
})
export class TableProductComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'share'];
  dataSource!: MatTableDataSource<ProductResponse>;
  public products: ProductResponse[] = [];
  public subscription: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProducts(); 
    this.subscription = this.productService.reload.subscribe(()=>{
      this.getProducts();
    });
  }

  ngAfterViewInit(): void {
    this.getProducts(); 
  }

  public getProducts(): void {
    this.productService.getAll().subscribe((res)=>{
      this.products = res;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      console.log(this.products);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}