import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductResponse } from '../../../interfaces/product.interface';
import { ProductServiceService } from '../../../services/product-service.service';
import { InventoryServiceService } from '../../../services/inventory-service.service';
import { Inventory } from '../../../interfaces/inventory.interface';
import { CreateInventoryComponent } from '../create-inventory/create-inventory.component';

@Component({
  selector: 'app-table-produc',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatMenuModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './table-produc.component.html',
  styleUrl: './table-produc.component.scss'
})
export class TableProducComponent implements OnInit{

  public displayedColumns: string[] = ['name', 'description', 'price', 'category', 'share'];
  public dataSource!: MatTableDataSource<ProductResponse>;
  public products: ProductResponse[] = [];
  public subscription: any;
  public dataSend!: ProductResponse;
  public inventory!: Inventory;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductServiceService, 
    private dialog: MatDialog,
    private inventoryService: InventoryServiceService
  ) { 
  
  }

  ngOnInit(): void {
      this.getProducts();
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

  public getDataTable(product: ProductResponse) {
    this.dataSend = product;
    this.getInventory(product);
  }

  public getInventory(product: ProductResponse) {
    this.inventoryService.getInventoryByProduct(product).subscribe(
      (res) => {
        this.inventory = res;
        alert('El producto ya cuenta con inventario');
      },
      (error) => {
       alert('El producto aún no cuenta con inventario, debe crear inventario !!');
       this.dataSend = product;
       this.openDialog();
      }
    );
  }
  
  public openDialog(): void {
    this.dialog.open(CreateInventoryComponent,{
      data: this.dataSend
    });
  }

  public createInventory(produc: ProductResponse): void {
    this.getInventory(produc);
  }

}
