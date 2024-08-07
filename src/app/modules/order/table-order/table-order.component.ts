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
import { MatDialog } from '@angular/material/dialog';
import { OrderServiceService } from '../../../services/order-service.service';
import { OrderItem } from '../../../interfaces/order.interface';
import { GenerateOrderComponent } from '../generate-order/generate-order.component';

@Component({
  selector: 'app-table-order',
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
  templateUrl: './table-order.component.html',
  styleUrl: './table-order.component.scss'
})
export class TableOrderComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'customer', 'address', 'share'];
  public dataSource!: MatTableDataSource<OrderItem>;
  public orders: OrderItem[] = [];
  public dataSend!: OrderItem;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderServiceService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getOrders(): void {
    this.orderService.getAll().subscribe((res) => {
      this.orders = res;
      this.dataSource = new MatTableDataSource(this.orders);
      console.log(this.orders);
    });
  }

  public getDataTable(data: OrderItem){
    this.dataSend = data;
  }

  public openModal(): void {
    this.dialog.open(GenerateOrderComponent,{
      width: '35rem',
      data: this.dataSend
    });
  }

}
