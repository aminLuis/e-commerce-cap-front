import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { ProductResponse } from '../interfaces/product.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { Inventory } from '../interfaces/inventory.interface';

const API_INVENTORY = environment.API_INVENTORY;

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  constructor(private http: HttpClient) { }

  public getInventoryByProduct(product: ProductResponse): Observable<Inventory> {
    const url = API_INVENTORY + "/findByProduct";
    return this.http.post<Inventory>(url,product)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  public save(inventory: Inventory): Observable<Inventory> {
    const url = API_INVENTORY + "/save";
    return this.http.post<Inventory>(url, inventory)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }


}
